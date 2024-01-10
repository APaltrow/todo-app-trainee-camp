import { IUserDocument } from '@interfaces';

export class UserDto {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  constructor({ _id: id, email, firstName, lastName }: IUserDocument) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
