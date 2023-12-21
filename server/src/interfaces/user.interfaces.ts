import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  email: string;
  passwordHash: string;
  comparePassword: (candidatePass: string) => Promise<boolean>;
}
