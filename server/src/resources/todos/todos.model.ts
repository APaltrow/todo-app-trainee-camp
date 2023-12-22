import { Schema, model } from 'mongoose';

import { ITodoDocument } from '@interfaces';

const TodoSchema = new Schema(
  {
    text: { type: String, required: true },
    isDone: { type: Boolean, required: true },
    creationDate: { type: String, required: true },
    expirationDate: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    versionKey: false,
  },
);

export const todosModel = model<ITodoDocument>('Todo', TodoSchema);
