import { Schema, model } from 'mongoose';
import { TGift } from './gift.interface';
import { Brand, Category, Occasion, Theme } from './gift.constant';

const giftSchema = new Schema<TGift>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    occasion: {
      type: String,
      enum: Occasion,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Category,
      required: true,
    },
    theme: {
      type: String,
      enum: Theme,
      required: true,
    },
    brand: {
      type: String,
      enum: Brand,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Gift = model<TGift>('Gift', giftSchema);
