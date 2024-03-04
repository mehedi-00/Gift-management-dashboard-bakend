/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SaleServices } from './sale.service';
import { Response } from 'express';

const createSale = catchAsync(async (req: any, res: Response) => {
  const { userId } = req?.user;
  const { id } = req.params;
  const result = await SaleServices.createSaleIntoDB(id, userId, req.body);
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sale created successfully',
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await SaleServices.getAllSalesFormDB(req?.query);
  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sale are retrive successfully',
    data: result,
  });
});

export const SaleControllers = {
  createSale,
  getAllSales,
};
