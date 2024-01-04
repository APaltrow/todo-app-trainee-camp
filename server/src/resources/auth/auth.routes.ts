import { Router } from 'express';

import { AuthPaths } from '@constants';
import { validateResource } from '@middlewares';

import { authController } from './auth.controller';
import { UserSchema } from './user.schema';

export const authRouter = Router();

authRouter.post(
  AuthPaths.LOGIN,
  validateResource(UserSchema),
  authController.login,
);
authRouter.post(AuthPaths.LOGOUT, authController.logout);
authRouter.get(AuthPaths.REFRESH, authController.refresh);
