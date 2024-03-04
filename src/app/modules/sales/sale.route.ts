import express from 'express';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { Salevlidation } from './sale.validation';
import { SaleControllers } from './sale.controller';

const router = express.Router();

router.post(
  '/create-sale/:id',
  auth('seller', 'manager'),
  validateRequest(Salevlidation.createSalevalidationSchema),
  SaleControllers.createSale,
);

router.get('/', auth('manager', 'seller'), SaleControllers.getAllSales);

export const SaleRoutes = router;
