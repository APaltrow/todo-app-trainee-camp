import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  resetPasswordId: string;
  comparePassword: (candidatePass: string) => Promise<boolean>;
}
