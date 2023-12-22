import { Router } from 'express';

import { AppPaths } from '@constants';

import { healthRouter, authRouter, todosRouter } from '@resources';

export const apiRouter = Router();

apiRouter.use(AppPaths.HEALTH, healthRouter);
apiRouter.use(AppPaths.AUTH, authRouter);
apiRouter.use(AppPaths.TODOS, todosRouter);
