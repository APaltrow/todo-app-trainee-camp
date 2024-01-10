import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  comparePassword: (candidatePass: string) => Promise<boolean>;
}
