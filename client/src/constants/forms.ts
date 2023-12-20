import { IconsTypes, Validations } from '@types';

export const LOGIN_FORM_INITIAL_VALUES = {
  email: '',
  password: '',
};

export const LOGIN_FORM_INITIAL__ERRORS = {
  email: 'Field cannot be empty',
  password: 'Field cannot be empty',
};

export const LOGIN_FORM_VALIDATIONS: Record<string, Validations> = {
  email: {
    isEmpty: true,
    isEmail: true,
  },
  password: {
    isEmpty: true,
    minLength: 6,
  },
};

export const LOGIN_INPUTS = [
  {
    name: 'email',
    placeholder: 'Email',
    icon: IconsTypes.EMAIL,
    type: 'text',
  },
  {
    name: 'password',
    placeholder: 'Password',
    icon: IconsTypes.PASSWORD,
    type: 'password',
  },
];
