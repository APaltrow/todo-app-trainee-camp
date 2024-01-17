import { Schema, model } from 'mongoose';

import { comparePasswords, hashPassword } from '@utils';
import { IUserDocument } from '@interfaces';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImg: { type: String, default: '' },
    resetPasswordId: { type: String, default: '' },
  },
  {
    versionKey: false,
  },
);

UserSchema.pre('save', hashPassword);

UserSchema.methods.comparePassword = comparePasswords;

export const userModel = model<IUserDocument>('User', UserSchema);
