import { ErrorRequestHandler } from 'express';

import { ResponseErrors, Statuses } from '@constants';
import { ApiError } from '@utils';
import { IApiError } from '@interfaces';

export const errorMiddleware: ErrorRequestHandler = (
  err: IApiError,
  req,
  res,
) => {
  console.log(err);

  const { status, message, errors } = err;

  if (err instanceof ApiError) {
    return res.status(status).json({ message, errors });
  }

  return res
    .status(Statuses.UNEXPECTED)
    .json({ message: ResponseErrors.UNEXPECTED });
};
