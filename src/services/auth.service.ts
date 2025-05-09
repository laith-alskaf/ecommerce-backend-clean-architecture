import { UserRepository } from '../database/mongodb/repositories/user.repository';
import { IUser } from '../interfaces/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail, sendResetSuccessEmail, sendWelcomeEmail } from '../utils/email/emails';
import { string } from 'joi';

export class AuthService {
  private userRepository: UserRepository;
  private jwtSecret: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.jwtSecret = process.env.JWT_SECRET || 'bW@$3@r%6eR%6!%6mZ%6eR@x';
  }

  async signup(userData: IUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const user = await this.userRepository.createUser(userData);
    if (!user) { throw new Error("Please, try again after 1m"); }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otpCode;
    user.otpCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.save();
    await sendVerificationEmail(user.email, otpCode);

    return user;
  }

  async login(email: string, password: string): Promise<{ token: string, user: IUser }> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user?.isEmailVerified) {
      throw new Error('You should verifiy email before login');
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '7d'
    });
    user.lastLogin = new Date();

    return { token, user };
  }

  async forgotPassword(email: string): Promise<IUser | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    try {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.otpCode = otpCode;
      user.otpCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 
      await user.save();

      await sendVerificationEmail(email, otpCode);

      return user;
    } catch (error) {
      throw new Error("Error in otplib, when generate otpCode and otpSecret");
    }

  }

  async verifiyEmail(code: string): Promise<void> {
    const user = await this.userRepository.getUserByCode(code);
    if (!user) throw new Error("Invalid or expired verification code");

    if (user.otpCode !== code || user.otpCodeExpires < new Date()) {
      throw new Error("Expired verification code");
    }
    user.otpCodeExpires = new Date("00");
    user.otpCode = '';
    user.isEmailVerified = true;
    user.save();

    await sendWelcomeEmail(user.email, user.userName);
  }

  async changePassword(password: string, email: string): Promise<IUser> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otpCodeExpires = new Date("00");
    user.otpCode = '';
    await user.save();
    await sendResetSuccessEmail(user.email);

    return user;
  }

}
