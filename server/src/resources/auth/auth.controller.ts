import { Request, Response, NextFunction } from 'express';

import { jwtToken } from '@utils';

import { authService } from './auth.service';
import { UserInput } from './user.schema';

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const REFRESH_TOKEN = 'refreshToken';

class AuthController {
  async login(
    req: Request<{}, {}, UserInput['body']>,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;

    try {
      const { id, ...userData } = await authService.login(email, password);

      const { accessToken, refreshToken } = jwtToken.generateTokens({ id });

      await jwtToken.saveToken(id, refreshToken);

      res.cookie(REFRESH_TOKEN, refreshToken, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      });

      return res.json({ ...userData, accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      await authService.logout(refreshToken);

      res.clearCookie(REFRESH_TOKEN);

      return res.json({ message: 'success' });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken, accessToken } = await authService.refresh(
        req.cookies.refreshToken,
      );

      res.cookie(REFRESH_TOKEN, refreshToken, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      });

      return res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
