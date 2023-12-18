import { Request, Response } from 'express';

import { ResponseErrors, Statuses } from '@constants';

export const notFoundMiddleware = (req: Request, res: Response) => {
  return res
    .status(Statuses.NOT_FOUND)
    .json({ message: `${ResponseErrors.NOT_FOUND} ${req.originalUrl}` });
};
