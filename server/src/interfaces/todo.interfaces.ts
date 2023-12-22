import { Schema } from 'mongoose';

export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
  creationDate: string;
  expirationDate: string;
}

export interface ITodoDocument extends Document {
  _id: Schema.Types.ObjectId;
  text: string;
  isDone: boolean;
  creationDate: string;
  expirationDate: string;
  user: Schema.Types.ObjectId;
}
