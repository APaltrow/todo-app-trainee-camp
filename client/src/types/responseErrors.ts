export interface IValidationError {
  message: string;
}

export interface IResponseError {
  message: string;
  errors: IValidationError[];
}

export enum ErrorsAlt {
  FAILED_LOGIN = 'Login failed',
  FAILED_FETCH_TODOS = 'Could not fetch todos ...',
  FAILED_CREATE_TODO = 'Could not create todo ...',
}
