import { Router } from 'express';

import { AuthPaths } from '@constants';
import { authMiddleware, validateResource } from '@middlewares';

import { authController } from './auth.controller';
import {
  UserChangePasswordSchema,
  UserLoginSchema,
  UserRegistrationSchema,
  UserResetPasswordLinkSchema,
  UserResetPasswordSchema,
  UserUploadsSchema,
} from './user.schema';

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
authRouter.put(
  AuthPaths.CHANGE_PASSWORD,
  authMiddleware,
  validateResource(UserChangePasswordSchema),
  authController.changePassword,
);
authRouter.put(
  AuthPaths.UPLOADS,
  authMiddleware,
  validateResource(UserUploadsSchema),
  authController.uploads,
);
authRouter.post(
  AuthPaths.RESET_PASS_LINK,
  validateResource(UserResetPasswordLinkSchema),
  authController.resetPasswordLink,
);
authRouter.put(
  AuthPaths.RESET_PASS,
  validateResource(UserResetPasswordSchema),
  authController.resetPassword,
);
