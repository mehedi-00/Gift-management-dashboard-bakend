/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  userName: string;
  email: string;
  password: string;
  role: 'seller' | 'manager';
};

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<boolean>;
  isUserPasswordMatch(
    userPassword: string,
    hashedpassword: string,
  ): Promise<boolean>;
}
