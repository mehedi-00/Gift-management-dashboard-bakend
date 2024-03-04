import express from 'express';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { GiftValidation } from './gift.validaion';
import { GiftControllers } from './gift.controller';

const router = express.Router();

router.get('/', auth('manager', 'seller'), GiftControllers.getAllGifts);
router.post(
  '/create-gift',
  auth('manager'),
  validateRequest(GiftValidation.createGiftvalidationSchema),
  GiftControllers.createGift,
);

router.get('/:id', auth('manager', 'seller'), GiftControllers.getSingleGift);

router.put(
  '/update-gift/:id',
  auth('manager'),
  validateRequest(GiftValidation.updateGiftvalidationSchema),
  GiftControllers.giftUpdate,
);
router.delete('/delete-gift/:id', auth('manager'), GiftControllers.deleteGift);
router.delete('/many-delete', auth('manager'), GiftControllers.manyDeleteGift);

export const GiftRouters = router;
