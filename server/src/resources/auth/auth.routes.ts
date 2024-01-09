import { Router } from 'express';

import { AuthPaths } from '@constants';
import { validateResource } from '@middlewares';

import { authController } from './auth.controller';
import { UserLoginSchema, UserRegistrationSchema } from './user.schema';

export const authRouter = Router();

authRouter.post(
  AuthPaths.LOGIN,
  validateResource(UserLoginSchema),
  authController.login,
);
authRouter.post(
  AuthPaths.REGISTER,
  validateResource(UserRegistrationSchema),
  authController.register,
);
authRouter.post(AuthPaths.LOGOUT, authController.logout);
authRouter.get(AuthPaths.REFRESH, authController.refresh);
