import jwt from 'jsonwebtoken';

import { LogMessages, appConfig } from '@constants';
import { TokenPayload, TokenVerificationResult } from '@interfaces';

class Token {
  accessSecret = appConfig.JWT_ACCESS_SECRET;

  accessExp = appConfig.JWT_ACCESS_EXP;

  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExp,
    });

    return {
      accessToken,
    };
  }

  verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.accessSecret);

      const { id } = decoded as TokenVerificationResult;

      return id;
    } catch (error) {
      console.log(LogMessages.JWT, error);
      return null;
    }
  }
}

export const jwtToken = new Token();
