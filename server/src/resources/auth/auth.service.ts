import {
  ApiError,
  checkResetLinkExpiration,
  getResetLink,
  jwtToken,
  mailer,
} from '@utils';
import {
  AuthErrors,
  FIRST_ARR_INDEX,
  RESET_LINK_DIVIDER,
  appConfig,
} from '@constants';
import { IUserDocument } from '@interfaces';

import { userModel } from './user.model';
import { UserDto } from './user.dto';
import { UserRegistrationInput } from './user.schema';

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
    const { id, ...userData } = new UserDto(user);

    const tokens = jwtToken.generateTokens({ id });

    await jwtToken.saveToken(id, tokens.refreshToken);

    return { ...userData, ...tokens };
  }

  async register(credentials: UserRegistrationInput['body']) {
    try {
      const { password, ...userInfo } = credentials;

      const newUser = await userModel.create({
        ...userInfo,
        passwordHash: password,
      });

      newUser.save();

      const { id, ...userData } = new UserDto(newUser);

      const tokens = jwtToken.generateTokens({ id });

      await jwtToken.saveToken(id, tokens.refreshToken);

      return { ...userData, ...tokens };
    } catch (error) {
      throw ApiError.BadRequest(AuthErrors.DUPLICATED_EMAIL);
    }
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

    const user = await userModel.findById(id);

    if (!id || !tokenFromDB || !user) {
      throw ApiError.Unauthorized();
    }

    const tokens = jwtToken.generateTokens({ id });

    await jwtToken.saveToken(id, tokens.refreshToken);

    const { id: userId, ...userData } = new UserDto(user);

    return { ...tokens, ...userData };
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await userModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest(AuthErrors.INVATID_CREDENTIALS);
    }

    const isOldPassSame = await user.comparePassword(oldPassword);

    if (!isOldPassSame) {
      throw ApiError.BadRequest(AuthErrors.INVATID_CREDENTIALS);
    }

    user.passwordHash = newPassword;
    user.save();

    return user;
  }

  async uploadPhoto(userId: string, profileImg: string) {
    const updatedUser = await userModel.findByIdAndUpdate<IUserDocument>(
      userId,
      { profileImg },
      {
        new: true,
      },
    );

    if (!updatedUser) {
      throw ApiError.Unauthorized();
    }

    return new UserDto(updatedUser);
  }

  async generateResetPasswordLink(email: string) {
    const user = await userModel.findOne<IUserDocument>({ email });

    if (!user) {
      throw ApiError.BadRequest(AuthErrors.INCORRECT_EMAIL);
    }

    const { _id: userId } = user;
    const { resetId, resetPassLink } = getResetLink(userId);

    user.resetPasswordId = resetId;
    await user.save();

    await mailer.sendResetPasswordLink(email, resetPassLink);
  }

  async resetPassword(newPassword: string, resetLink: string) {
    const user = await userModel.findOne({ resetPasswordId: resetLink });

    const isValidLink = checkResetLinkExpiration(resetLink);

    if (!user || !isValidLink) {
      throw ApiError.BadRequest(AuthErrors.INVALID_RESET_LINK);
    }

    user.passwordHash = newPassword;
    user.resetPasswordId = '';
    user.save();

    return user;
  }
}

export const authService = new AuthService();
