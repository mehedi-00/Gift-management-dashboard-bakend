import { z } from 'zod';
import { Brand, Category, Occasion, Theme } from './gift.constant';

const createGiftvalidationSchema = z.object({
  name: z.string({ required_error: 'name is required' }),
  price: z.number({ required_error: 'price is required' }),
  quantity: z.number({ required_error: 'quantity is required' }),
  occasion: z.enum([...Occasion] as [string, ...string[]]),
  recipient: z.string({ required_error: 'recipient is required' }),
  category: z.enum([...Category] as [string, ...string[]]),
  theme: z.enum([...Theme] as [string, ...string[]]),
  brand: z.enum([...Brand] as [string, ...string[]]),
});
const updateGiftvalidationSchema = z.object({
  name: z.string({ required_error: 'name is required' }).optional(),
  price: z.number({ required_error: 'price is required' }).optional(),
  quantity: z.number({ required_error: 'quantity is required' }).optional(),
  occasion: z.enum([...Occasion] as [string, ...string[]]).optional(),
  recipient: z.string({ required_error: 'recipient is required' }).optional(),
  category: z.enum([...Category] as [string, ...string[]]).optional(),
  theme: z.enum([...Theme] as [string, ...string[]]).optional(),
  brand: z.enum([...Brand] as [string, ...string[]]).optional(),
});

export const GiftValidation = {
  createGiftvalidationSchema,
  updateGiftvalidationSchema,
};
