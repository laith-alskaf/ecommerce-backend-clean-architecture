// src/repositories/user.repository.ts
import { IUser } from '../../../interfaces/user';
import { UserModel } from '../models/user.model';

export class UserRepository {

  async createUser(user: IUser): Promise<IUser> {
    return await UserModel.create(user);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

  async getUserByCode(code: string): Promise<IUser | null> {
    return await UserModel.findOne({ otpCode: code });
  }


}
