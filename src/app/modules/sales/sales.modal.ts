import { Schema, model } from 'mongoose';
import { TSale } from './sale.interface';

const saleSchema = new Schema<TSale>({
  buyerName: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  giftName: {
    type: String,
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  couponCode: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

export const Sale = model<TSale>('Sale', saleSchema);
