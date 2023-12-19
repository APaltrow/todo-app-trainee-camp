import { TypeOf, object, string } from 'zod';

export const UserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Invalid email'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password should be at least 6 chars'),
  }),
});

export type UserInput = TypeOf<typeof UserSchema>;
