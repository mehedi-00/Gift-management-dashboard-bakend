import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { GiftRouters } from '../modules/gift/gift.route';
import { SaleRoutes } from '../modules/sales/sale.route';
import { CouponRouters } from '../modules/coupon/coupon.route';

const router = Router();

const AllRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/gifts',
    route: GiftRouters,
  },
  {
    path: '/sales',
    route: SaleRoutes,
  },
  {
    path: '/coupons',
    route: CouponRouters,
  },
];

AllRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
