import { Request, Response, NextFunction } from 'express';

import {
  AUTH_HEADER_DIVIDER,
  FIRST_ARR_INDEX,
  ResponseErrors,
  Statuses,
} from '@constants';
import { jwtToken } from '@utils';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token =
    req.headers.authorization?.split(AUTH_HEADER_DIVIDER)[FIRST_ARR_INDEX];

  if (!token) {
    return res
      .status(Statuses.UNAUTHORIZED)
      .json({ message: ResponseErrors.UNAUTHORIZED });
  }

  const userId = jwtToken.verifyAccessToken(token);

  if (!userId) {
    return res
      .status(Statuses.UNAUTHORIZED)
      .json({ message: ResponseErrors.UNAUTHORIZED });
  }

  req.headers.authorization = userId;

  return next();
};
