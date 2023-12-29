import { Request, Response, NextFunction } from 'express';

import { jwtToken } from '@utils';
import { COOKIE_MAX_AGE, REFRESH_TOKEN } from '@constants';

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

  async register(
    req: Request<{}, {}, UserRegistrationInput['body']>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const { refreshToken, ...userData } = await authService.register(
        email,
        password,
      );

      res.cookie(REFRESH_TOKEN, refreshToken, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      });

      return res.json(userData);
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
      const { refreshToken, accessToken, email } = await authService.refresh(
        req.cookies.refreshToken,
      );

      res.cookie(REFRESH_TOKEN, refreshToken, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      });

      return res.json({ accessToken, email });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
