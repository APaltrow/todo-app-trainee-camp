import { TypeOf, boolean, object, string } from 'zod';

export const TodoSchema = object({
  body: object({
    text: string({
      required_error: 'Todo text is required',
    }).min(1, 'Text should not be empty'),
    isDone: boolean({
      required_error: 'Todo isDone is required',
    }),
    creationDate: string({
      required_error: 'Todo creation date is required',
    }).datetime('Invalid creation date'),
    expirationDate: string({
      required_error: 'Todo expiration date is required',
    }).datetime('Invalid expiration date'),
  }),
});

export type UserTodoInput = TypeOf<typeof TodoSchema>;
