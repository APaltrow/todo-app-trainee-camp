import { IUserDocument } from '@interfaces';

export class UserDto {
  id: string;

  email: string;

  constructor({ _id: id, email }: IUserDocument) {
    this.id = id;
    this.email = email;
  }
}
