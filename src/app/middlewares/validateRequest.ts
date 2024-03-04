import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (validateSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateSchema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
