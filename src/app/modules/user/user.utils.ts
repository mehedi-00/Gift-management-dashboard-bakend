import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; userName: string; email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
