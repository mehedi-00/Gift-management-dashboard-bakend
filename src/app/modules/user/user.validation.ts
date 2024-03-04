import { z } from 'zod';

const createUserValidationSchema = z.object({
  userName: z.string({ required_error: 'userName is required' }),
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
  role: z.enum(['manager', 'seller'], { required_error: 'role is required' }),
});

const loginUserValidationSchema = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
