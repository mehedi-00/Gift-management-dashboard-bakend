import { Schema, model } from 'mongoose';
import { TCoupon } from './coupon.interface';

const couponSchema = new Schema<TCoupon>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

export const Coupon = model<TCoupon>('Coupon', couponSchema);
