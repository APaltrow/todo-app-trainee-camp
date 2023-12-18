import { Router, Request, Response } from 'express';

import { AppPaths } from '@constants';

export const healthRouter = Router();

healthRouter.get(AppPaths.ROOT, (req: Request, res: Response) => {
  return res.json({ message: 'Server is up and running !' });
});
