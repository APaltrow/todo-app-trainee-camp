import { Request, Response, NextFunction } from 'express';

import { LogMessages, ResponseErrors, Statuses } from '@constants';
import { ApiError } from '@utils';
import { IApiError } from '@interfaces';

export const errorMiddleware = (
  err: IApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(LogMessages.ERROR, err);

  const { status, message, errors } = err;

  if (err instanceof ApiError) {
    return res.status(status).json({ message, errors });
  }

  return res
    .status(Statuses.UNEXPECTED)
    .json({ message: ResponseErrors.UNEXPECTED });
};
