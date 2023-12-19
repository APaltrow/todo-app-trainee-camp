import { Request, Response, NextFunction } from 'express';

import { jwtToken } from '@utils';

import { authService } from './auth.service';
import { UserInput } from './user.schema';

class AuthController {
  async login(
    req: Request<{}, {}, UserInput['body']>,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;

    try {
      const { id, ...userData } = await authService.login(email, password);

      const accessDto = jwtToken.generateTokens({ id });

      return res.json({ ...userData, ...accessDto });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
