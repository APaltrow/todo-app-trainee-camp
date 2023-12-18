import { Router } from 'express';

import { AppPaths } from '@constants';

import { healthRouter } from '@resources';

export const apiRouter = Router();

apiRouter.use(AppPaths.HEALTH, healthRouter);
