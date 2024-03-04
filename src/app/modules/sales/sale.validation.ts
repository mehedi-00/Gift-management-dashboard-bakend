import { z } from 'zod';

const createSalevalidationSchema = z.object({
  buyerName: z.string({ required_error: 'buyerName is required' }),
  productQuantity: z.number({ required_error: 'productQuantity is required' }),
  saleDate: z.string({ required_error: 'saleDate is required' }),
  couponCode: z.string().optional(),
});

export const Salevlidation = {
  createSalevalidationSchema,
};
