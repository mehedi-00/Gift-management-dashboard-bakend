import { Date, Types } from 'mongoose';

export type TSale = {
  buyerName: string;
  productQuantity: number;
  saleDate: Date;
  seller: Types.ObjectId;
  couponCode?: string;
  totalPrice: number;
  giftName: string;
};
