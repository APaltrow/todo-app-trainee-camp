import { Request, Response, NextFunction } from 'express';

import { authService } from './auth.service';
import { UserInput } from './user.schema';

class AuthController {
  async login(
    req: Request<{}, {}, UserInput['body']>,
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
}

export const authController = new AuthController();
