import { TypeOf, object, string } from 'zod';

import { EMTY_STR_REGEXP, PASS_MIN_LENG, ValidationErrors } from '@constants';

export const UserLoginSchema = object({
  body: object({
    email: string({
      required_error: ValidationErrors.EMAIL_REQUIRED,
    }).email(ValidationErrors.EMAIL_INVALID),
    password: string({
      required_error: ValidationErrors.PASS_REQUIRED,
    }).min(PASS_MIN_LENG, ValidationErrors.PASS_MIN_LENG),
  }),
});

export const UserRegistrationSchema = object({
  body: object({
    email: string({
      required_error: ValidationErrors.EMAIL_REQUIRED,
    }).email(ValidationErrors.EMAIL_INVALID),
    password: string({
      required_error: ValidationErrors.PASS_REQUIRED,
    })
      .min(PASS_MIN_LENG, ValidationErrors.PASS_MIN_LENG)
      .regex(EMTY_STR_REGEXP, ValidationErrors.PASS_INVALID),
    passwordConfirm: string({
      required_error: ValidationErrors.PASS_CONFIRMATION,
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: ValidationErrors.PASS_MISMATCH,
    path: ['passwordConfirm'],
  }),
});

export type UserLoginInput = TypeOf<typeof UserLoginSchema>;
export type UserRegistrationInput = TypeOf<typeof UserRegistrationSchema>;
