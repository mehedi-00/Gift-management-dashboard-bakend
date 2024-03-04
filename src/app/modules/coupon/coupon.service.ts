import { TCoupon } from './coupon.interface';
import { Coupon } from './coupon.modal';

const createCouponIntoDB = async (payload: TCoupon) => {
  const result = await Coupon.create(payload);
  return result;
};

const getAllCouponFormDB = async () => {
  const result = await Coupon.find();
  return result;
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponFormDB,
};
