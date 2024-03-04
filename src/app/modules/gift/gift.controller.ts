import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GiftServices } from './gift.service';

const createGift = catchAsync(async (req, res) => {
  const result = await GiftServices.createGiftIntoDB(req.body);
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Gift created successfully',
    data: result,
  });
});

const getSingleGift = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GiftServices.getSingleGiftFormDB(id);
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Gift retrive successfully',
    data: result,
  });
});

const giftUpdate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GiftServices.updateGift(id, req.body);
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Gift updated successfully',
    data: result,
  });
});

const getAllGifts = catchAsync(async (req, res) => {
  const result = await GiftServices.getAllGifts(req?.query);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gift are retrived successfully',
    data: result,
  });
});
const deleteGift = catchAsync(async (req, res) => {
  const { id } = req.params;
  await GiftServices.deleteGift(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gift  deleted successfully',
    data: null,
  });
});
const manyDeleteGift = catchAsync(async (req, res) => {
  await GiftServices.manyDeleteGift(req.body);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gift are deleted successfully',
    data: null,
  });
});

export const GiftControllers = {
  createGift,
  getSingleGift,
  giftUpdate,
  getAllGifts,
  deleteGift,
  manyDeleteGift,
};
