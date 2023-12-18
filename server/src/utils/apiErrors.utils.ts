import { ValidationError } from '@interfaces';
import { ResponseErrors, Statuses } from '@constants';

export class ApiError extends Error {
  status: number;

  errors: ValidationError[];

  constructor(status: number, message: string, errors: ValidationError[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    return new ApiError(Statuses.UNAUTHORIZED, ResponseErrors.UNAUTHORIZED);
  }

  static BadRequest(message: string, errors: ValidationError[] = []) {
    return new ApiError(Statuses.BAD_REQUEST, message, errors);
  }
}
