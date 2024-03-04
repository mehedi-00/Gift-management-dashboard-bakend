/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.modal';
import AppError from '../errors/AppError';
type TUserRole = 'manager' | 'seller';
const auth = (...requirdRoles: TUserRole[]) => {
  return catchAsync(
    async (req: Request | any, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Unauthorized Access',
          errorMessage:
            'You do not have the necessary permissions to access this resource.',
          errorDetails: null,
          stack: null,
        });
      }
      const decoded = jwt.verify(
        token,
        config.jwt_access_srcret as string,
      ) as JwtPayload;
      // console.log(decoded);
      const { role, userId } = decoded;
      const isExistsUser = await User.findById(userId);
      if (!isExistsUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
      }
      if (requirdRoles && !requirdRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      }

      req.user = decoded as JwtPayload & { role: string };
      next();
    },
  );
};

export default auth;
