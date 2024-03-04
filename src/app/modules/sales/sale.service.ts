import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Gift } from '../gift/gift.modal';
import { TSale } from './sale.interface';
import { Sale } from './sales.modal';
import { Types } from 'mongoose';
import { Coupon } from '../coupon/coupon.modal';

const createSaleIntoDB = async (
  id: string,
  userId: Types.ObjectId,
  payload: TSale,
) => {
  const isExistGift = await Gift.findById(id);
  const { couponCode } = payload;

  if (!isExistGift) {
    throw new AppError(httpStatus.NOT_FOUND, 'Gift not found');
  }
  payload.giftName = isExistGift.name;
  const totalAmount = isExistGift?.price * payload?.productQuantity;
  if (couponCode) {
    const isExistCoupon = await Coupon.findOne({ code: couponCode });
    if (!isExistCoupon) {
      throw new AppError(httpStatus.NOT_FOUND, 'couponCode is not valid');
    }
    if (isExistCoupon.expirationDate < new Date()) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'coupon date is out of range',
      );
    }
    const discountAmount =
      (isExistCoupon?.discountPercentage / 100) * totalAmount;
    payload.totalPrice = totalAmount - discountAmount;
    payload.seller = userId;
    const productQuantity = isExistGift.quantity - payload.productQuantity;
    await Gift.findByIdAndUpdate(id, {
      quantity: productQuantity,
    });
    const result = await Sale.create(payload);
    return result;
  } else {
    payload.totalPrice = totalAmount;
    payload.seller = userId;
    const productQuantity = isExistGift.quantity - payload.productQuantity;
    await Gift.findByIdAndUpdate(id, {
      quantity: productQuantity,
    });
    const result = await Sale.create(payload);
    return result;
  }
};

const getAllSalesFormDB = async (query: Record<string, unknown>) => {
  const currentDate = new Date();
  let startDate: Date;
  switch (query?.timeRange || '1y') {
    case '1d':
      startDate = new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      break;
    case '7d':
      startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '1y':
      startDate = new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      throw new AppError(
        httpStatus.FAILED_DEPENDENCY,
        'Invalid time range parameter',
      );
  }

  const result = await Sale.find({
    saleDate: {
      $gte: startDate.toISOString(),
      $lte: currentDate.toISOString(),
    },
  }).populate('seller');
  return result;
};

export const SaleServices = {
  createSaleIntoDB,
  getAllSalesFormDB,
};
