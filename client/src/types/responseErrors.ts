export interface IValidationError {
  message: string;
}

export interface IResponseError {
  message: string;
  errors: IValidationError[];
}

export enum ErrorsAlt {
  FAILED_LOGIN = 'Login failed',
  FAILED_REGISTRATION = 'Registration failed',
  FAILED_LOGOUT = 'Failed to log out',
  FAILED_CHECK = 'Could not find such user',
  FAILED_FETCH_TODOS = 'Could not fetch todos ...',
  FAILED_CREATE_TODO = 'Could not create todo ...',
  FAILED_UPDATE_TODO = 'Could not edit todo ...',
  FAILED_CHANGE_PASSWORD = 'Failed to change password ...',
  FAILED_PHOTO_UPLOAD = 'Failed to upload the photo',
  FAILED_RESET_PASS = 'Failed to reset the password ...',
}
