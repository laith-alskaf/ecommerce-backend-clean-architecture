// src/repositories/user.repository.ts

import { UserModel } from "../database/mongodb/models/user.model";
import { IUser } from "../interfaces/user";


export class UserRepository {

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save();
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
