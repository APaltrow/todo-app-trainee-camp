import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import bcrypt from 'bcrypt';

import { appConfig } from '@constants';
import { IUserDocument } from '@interfaces';

export async function hashPassword(
  next: CallbackWithoutResultAndOptionalError,
) {
  const user = this as IUserDocument;

  if (!user.isModified('passwordHash')) {
    return next();
  }

  const salt = await bcrypt.genSalt(+appConfig.SALT_ROUNDS);
  const hash = bcrypt.hashSync(user.passwordHash, salt);

  user.passwordHash = hash;

  return next();
}

export async function comparePasswords(
  candidatePass: string,
): Promise<boolean> {
  const user = this as IUserDocument;

  try {
    const isSamePass = await bcrypt.compare(candidatePass, user.passwordHash);

    return isSamePass;
  } catch (error) {
    return false;
  }
}
