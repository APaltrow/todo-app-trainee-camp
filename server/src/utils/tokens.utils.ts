import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';

import { LogMessages, appConfig } from '@constants';
import { TokenPayload, TokenVerificationResult } from '@interfaces';

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, require: true },
});

const tokenModel = model('Token', TokenSchema);

class Token {
  accessSecret = appConfig.JWT_ACCESS_SECRET;

  accessExp = appConfig.JWT_ACCESS_EXP;

  refreshSecret = appConfig.JWT_REFRESH_SECRET;

  refreshExp = appConfig.JWT_REFRESH_EXP;

  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExp,
    });

    const refreshToken = jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExp,
    });

    return {
      accessToken,
      refreshToken,
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

  verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.refreshSecret);

      const { id } = decoded as TokenVerificationResult;

      return id;
    } catch (error) {
      console.log(LogMessages.JWT, error);
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });

    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}

export const jwtToken = new Token();
