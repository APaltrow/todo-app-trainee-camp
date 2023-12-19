import { ApiError } from '@utils';
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
}

export const authService = new AuthService();
