import express from 'express';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { CouponValidation } from './coupon.validation';
import { CouponControllers } from './coupon.controller';

const router = express.Router();

router.post(
  '/create-coupon',
  auth('manager'),
  validateRequest(CouponValidation.createCouponValidationSchema),
  CouponControllers.createCoupon,
);

router.get('/', auth('manager', 'seller'), CouponControllers.getAllCoupon);

export const CouponRouters = router;
