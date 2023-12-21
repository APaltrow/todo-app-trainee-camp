import jwt from 'jsonwebtoken';

import { appConfig } from '@constants';

class Token {
  accessSecret = appConfig.JWT_ACCESS_SECRET;

  accessExp = appConfig.JWT_ACCESS_EXP;

  generateTokens(payload: { id: string }) {
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExp,
    });

    return {
      accessToken,
    };
  }
}

export const jwtToken = new Token();
