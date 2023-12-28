import { ApiError, jwtToken } from '@utils';
import { AuthErrors } from '@constants';

import { userModel } from './user.model';
import { UserDto } from './user.dto';

class AuthService {
  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(AuthErrors.INCORRECT_CREDENTIALS);
    }

    const isSamePass = await user.comparePassword(password);

    if (!isSamePass) {
      throw ApiError.BadRequest(AuthErrors.INCORRECT_CREDENTIALS);
    }

    return new UserDto(user);
  }

  async logout(refreshToken: string) {
    const token = await jwtToken.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const id = jwtToken.verifyRefreshToken(refreshToken);

    const tokenFromDB = await jwtToken.findToken(refreshToken);

    if (!id || !tokenFromDB) {
      throw ApiError.Unauthorized();
    }

    const tokens = jwtToken.generateTokens({ id });

    await jwtToken.saveToken(id, tokens.refreshToken);

    return tokens;
  }
}

export const authService = new AuthService();
