/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.modal';
import { createToken } from './user.utils';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUser) => {
  const { email, password } = payload;

  const existUser:any = await User.isUserExistByEmail(email);
  if (!existUser) {
    throw new AppError(httpStatus.NOT_FOUND, `User  does not exist`);
  }
  // console.log({ existUser });
  const isPasswordMatch = await User.isUserPasswordMatch(
    password,
    existUser?.password ,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'User password does not match');
  }
  const jwtPayload = {
    userId: existUser?._id,
    userName: existUser?.userName,
    email: existUser?.email,
    role: existUser?.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_srcret as string,
    config.jwt_expirs_in as string,
  );
  return token;
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
