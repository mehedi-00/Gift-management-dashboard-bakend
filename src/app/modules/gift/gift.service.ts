import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TGift } from './gift.interface';
import { Gift } from './gift.modal';
import QueryBuilder from '../../builder/QueryBuilder';

const createGiftIntoDB = async (payload: TGift) => {
  const result = await Gift.create(payload);
  return result;
};

const getSingleGiftFormDB = async (id: string) => {
  const result = await Gift.findById(id);
  return result;
};

const updateGift = async (id: string, payload: Partial<TGift>) => {
  const isExistGift = await Gift.findById(id);
  if (!isExistGift) {
    throw new AppError(httpStatus.NOT_FOUND, 'Gift not found');
  }
  const result = await Gift.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getAllGifts = async (query: Record<string, unknown>) => {
  const giftQuery = new QueryBuilder(Gift.find({ quantity: { $gt: 0 } }), query)
    .search(['name'])
    .filter()
    .sort();

  // price range set

  const result = await giftQuery.modelQuery;
  return result;
};

const deleteGift = async (id: string) => {
  const result = await Gift.findByIdAndDelete(id);
  return result;
};

const manyDeleteGift = async (ids: string[]) => {
  const result = await Gift.deleteMany({ _id: { $in: ids } });
  return result;
};

export const GiftServices = {
  createGiftIntoDB,
  getSingleGiftFormDB,
  updateGift,
  getAllGifts,
  deleteGift,
  manyDeleteGift,
};
