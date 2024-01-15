export enum ResponseErrors {
  NOT_FOUND = 'Resource is not found at',
  UNEXPECTED = 'Unexpected error',
  UNAUTHORIZED = 'Unauthorized user',
}

export enum AuthErrors {
  INCORRECT_CREDENTIALS = 'Incorrect email or password',
  INVATID_CREDENTIALS = 'Invalid credentials',
  DUPLICATED_EMAIL = 'Email already exists',
}

export enum ValidationErrors {
  INVALID_CREDENTIALS = 'Invalid credentials',
  TODO_NOT_FOUND_BY_ID = 'Todo with such id is not found',
  INVALID_TODO_ID = 'Invalid todo id',

  EMAIL_REQUIRED = 'Email is required',
  EMAIL_INVALID = 'Invalid email',

  IMG_STR = 'Photo cannot be empty',
  IMG_STR_LENGTH = 'Photo url cannot be empty',

  PASS_REQUIRED = 'Password is required',
  PASS_MIN_LENG = 'Password should be at least 6 chars',
  PASS_INVALID = 'Invalid password value',
  PASS_CONFIRMATION = 'Password confirmation is required',
  PASS_MISMATCH = 'Passwords do not match',
  PASS_OLD_IS_SAME = 'New password cannot be same as old one',

  NAME_FIRST_LENGTH = 'First name is required',
  NAME_LAST_LENGTH = 'Last name is required',

  TODO_TEXT_REQUIRED = 'Todo text is required',
  TODO_TEXT_EMPTY = 'Text should not be empty',
  TODO_TEXT_INVALID = 'Invalid todo text value',
  TODO_ISDONE_REQUIRED = 'Todo isDone is required',
  TODO_CREATION_DATE_REQUIRED = 'Todo creation date is required',
  TODO_CREATION_DATE_INVALID = 'Invalid creation date',
  TODO_EXP_DATE_REQUIRED = 'Todo expiration date is required',
  TODO_EXP_DATE_INVALID = 'Invalid expiration date',
}
