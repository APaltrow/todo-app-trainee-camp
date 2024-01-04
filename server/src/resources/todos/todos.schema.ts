import { TypeOf, boolean, object, string } from 'zod';

import { EMTY_STR_REGEXP, TEXT_MIN_LENG, ValidationErrors } from '@constants';

export const TodoSchema = object({
  body: object({
    id: string().optional(),
    text: string({
      required_error: ValidationErrors.TODO_TEXT_REQUIRED,
    })
      .min(TEXT_MIN_LENG, ValidationErrors.TODO_TEXT_EMPTY)
      .regex(EMTY_STR_REGEXP, ValidationErrors.TODO_TEXT_INVALID),
    isDone: boolean({
      required_error: ValidationErrors.TODO_ISDONE_REQUIRED,
    }),
    creationDate: string({
      required_error: ValidationErrors.TODO_CREATION_DATE_REQUIRED,
    }).datetime(ValidationErrors.TODO_CREATION_DATE_INVALID),
    expirationDate: string({
      required_error: ValidationErrors.TODO_EXP_DATE_REQUIRED,
    }).datetime(ValidationErrors.TODO_EXP_DATE_INVALID),
  }),
});

export type UserTodoInput = TypeOf<typeof TodoSchema>;
