import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CouponServices } from './coupon.service';

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCouponIntoDB(req.body);
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Coupon created successfully',
    data: result,
  });
});

const getAllCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.getAllCouponFormDB();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon are retrive successfully',
    data: result,
  });
});

export const CouponControllers = {
  createCoupon,
  getAllCoupon,
};
