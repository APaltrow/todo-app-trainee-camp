import { Schema, Document } from 'mongoose';

export type UserId = Schema.Types.ObjectId;

export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
  creationDate: string;
  expirationDate: string;
}

export interface ITodoDocument extends Document {
  text: string;
  isDone: boolean;
  creationDate: string;
  expirationDate: string;
  user: UserId;
}

export type QueryParams = Record<string, string>;

export interface ParamsWithId {
  id: string;
}
