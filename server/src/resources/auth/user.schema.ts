import { TypeOf, object, string } from 'zod';

import {
  EMTY_STR_REGEXP,
  PASS_MIN_LENG,
  TEXT_MIN_LENG,
  ValidationErrors,
} from '@constants';

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
    firstName: string({
      required_error: ValidationErrors.NAME_FIRST_LENGTH,
    })
      .min(TEXT_MIN_LENG, ValidationErrors.NAME_FIRST_LENGTH)
      .regex(EMTY_STR_REGEXP, ValidationErrors.NAME_FIRST_LENGTH),
    lastName: string({
      required_error: ValidationErrors.NAME_LAST_LENGTH,
    })
      .min(TEXT_MIN_LENG, ValidationErrors.NAME_LAST_LENGTH)
      .regex(EMTY_STR_REGEXP, ValidationErrors.NAME_LAST_LENGTH),
    passwordConfirm: string({
      required_error: ValidationErrors.PASS_CONFIRMATION,
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: ValidationErrors.PASS_MISMATCH,
    path: ['passwordConfirm'],
  }),
});

export const UserChangePasswordSchema = object({
  body: object({
    oldPassword: string({
      required_error: ValidationErrors.PASS_REQUIRED,
    })
      .min(PASS_MIN_LENG, ValidationErrors.PASS_MIN_LENG)
      .regex(EMTY_STR_REGEXP, ValidationErrors.PASS_INVALID),
    newPassword: string({
      required_error: ValidationErrors.PASS_REQUIRED,
    })
      .min(PASS_MIN_LENG, ValidationErrors.PASS_MIN_LENG)
      .regex(EMTY_STR_REGEXP, ValidationErrors.PASS_INVALID),
    newPasswordConfirm: string({
      required_error: ValidationErrors.PASS_CONFIRMATION,
    }),
  })
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
      message: ValidationErrors.PASS_MISMATCH,
      path: ['newPasswordConfirm'],
    })
    .refine((data) => data.oldPassword !== data.newPasswordConfirm, {
      message: ValidationErrors.PASS_OLD_IS_SAME,
      path: ['newPassword'],
    }),
});

export type UserLoginInput = TypeOf<typeof UserLoginSchema>;
export type UserRegistrationInput = TypeOf<typeof UserRegistrationSchema>;
export type UserChangePasswordInput = TypeOf<typeof UserChangePasswordSchema>;
