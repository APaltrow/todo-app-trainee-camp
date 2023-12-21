export interface IValidationError {
  message: string;
}

export interface IResponseError {
  message: string;
  errors: IValidationError[];
}

export enum ErrorsAlt {
  FAILED_LOGIN = 'Login failed',
}