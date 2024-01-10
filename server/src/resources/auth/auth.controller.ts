import { Request, Response, NextFunction } from 'express';

import { authService } from './auth.service';
import { UserLoginInput, UserRegistrationInput } from './user.schema';

class AuthController {
  async login(
    req: Request<{}, {}, UserLoginInput['body']>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;

      const userData = await authService.login(email, password);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async register(
    req: Request<{}, {}, UserRegistrationInput['body']>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const credentials = req.body;
      const userData = await authService.register(credentials);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers.authorization || '';

      await authService.logout(refreshToken);

      return res.json({ message: 'success' });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers.authorization || '';

      const userData = await authService.refresh(refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.headers.authorization || '';
      const { oldPassword, newPassword } = req.body;

      await authService.changePassword(userId, oldPassword, newPassword);

      return res.json({ message: 'success' });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
