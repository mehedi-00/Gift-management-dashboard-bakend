import { z } from 'zod';

const createCouponValidationSchema = z.object({
  code: z.string({ required_error: 'coupon code is required' }),
  discountPercentage: z
    .number()
    .positive({ message: 'discount percentage must be a positive number' })
    .int({ message: 'discount percentage must be a number' })
    .refine((data) => !!data, { message: 'Discount percentage is required' }),
  expirationDate: z.string({
    required_error: 'coupon expiration date is required',
  }),
});

export const CouponValidation = {
  createCouponValidationSchema,
};
