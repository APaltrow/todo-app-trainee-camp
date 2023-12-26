export enum ResponseErrors {
  NOT_FOUND = 'Resource is not found at',
  UNEXPECTED = 'Unexpected error',
  UNAUTHORIZED = 'Unauthorized user',
}

export enum AuthErrors {
  INCORRECT_CREDENTIALS = 'Incorrect email or password',
}

export enum ValidationErrors {
  INVALID_CREDENTIALS = 'Invalid credentials',
  TODO_NOT_FOUND_BY_ID = 'Todo with such id is not found',
  INVALID_TODO_ID = 'Invalid todo id',
}
