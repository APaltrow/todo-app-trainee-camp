import { ITodoDocument } from '@interfaces';

export class TodoDto {
  text: string;

  isDone: boolean;

  creationDate: string;

  expirationDate: string;

  id: string;

  constructor({
    _id: id,
    text,
    isDone,
    creationDate,
    expirationDate,
  }: ITodoDocument) {
    this.id = id as unknown as string;
    this.text = text;
    this.isDone = isDone;
    this.creationDate = creationDate;
    this.expirationDate = expirationDate;
  }
}
