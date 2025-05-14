
export interface IUser {
  _id: string,
  userName: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'superAdmin';
  isEmailVerified: boolean;
  lastLogin: Date;
  otpCode: string;
  otpCodeExpires: Date;
}
