/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import AppError from '../errors/AppError';

export const glovalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong';
  let errorMessage = ``;
  let errorDetails = {};
  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation error';
    errorDetails = { issues: err.issues };
    const concatedMessage = err.issues.map((issue, index) => {
      if (index === err.issues.length - 1) {
        return issue.message;
      } else {
        return issue.message + '.';
      }
    });
    errorMessage = concatedMessage.join(' ') + '.';
  } else if (err.code === 11000) {
    const match = err.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];
    statusCode = 400;
    message = 'Duplicate Id';
    errorMessage = `${extractedMessage} is allrady exist`;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID';
    errorMessage = `${err.value} is not a valid ID!`;
    errorDetails = err;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorDetails = '';
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: err.stack,
  });
};
