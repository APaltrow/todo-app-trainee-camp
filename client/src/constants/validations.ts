export enum ValidationTypes {
  EMPTY = 'isEmpty',
  MIN_LENGTH = 'minLength',
  EMAIL = 'isEmail',
}

export enum ValidationsErrors {
  NO_ERROR = '',
  EMPTY_FIELD = 'Field cannot be empty',
  MIN_LENGTH = 'Min length should be',
  INVALID_EMAIL = 'Invalid email',
  PASSWORD_MISMATCH = 'Passwords do not match',
}
