import { IconsTypes, Validations } from '@types';

export const LOGIN_FORM_INITIAL_VALUES = {
  email: '',
  password: '',
};

export const REGISTRATION_FORM_INITIAL_VALUES = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirm: '',
};

export const CHANGE_PASS_FORM_INITIAL_VALUES = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export const LOGIN_FORM_INITIAL__ERRORS = {
  email: 'Field cannot be empty',
  password: 'Field cannot be empty',
};

export const REGISTRATION_FORM_INITIAL__ERRORS = {
  email: 'Field cannot be empty',
  firstName: 'Field cannot be empty',
  lastName: 'Field cannot be empty',
  password: 'Field cannot be empty',
  passwordConfirm: 'Field cannot be empty',
};

export const CHANGE_PASS_FORM_INITIAL__ERRORS = {
  oldPassword: 'Field cannot be empty',
  newPassword: 'Field cannot be empty',
  newPasswordConfirm: 'Field cannot be empty',
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

export const REGISTRATION_FORM_VALIDATIONS: Record<string, Validations> = {
  email: {
    isEmpty: true,
    isEmail: true,
  },
  firstName: {
    isEmpty: true,
  },
  lastName: {
    isEmpty: true,
  },
  password: {
    isEmpty: true,
    minLength: 6,
  },
  passwordConfirm: {
    isEmpty: true,
    minLength: 6,
  },
};

export const CHANGE_PASS_FORM_VALIDATIONS: Record<string, Validations> = {
  oldPassword: {
    isEmpty: true,
    minLength: 6,
  },
  newPassword: {
    isEmpty: true,
    minLength: 6,
  },
  newPasswordConfirm: {
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

export const REGISTRATION_INPUTS = [
  {
    name: 'email',
    placeholder: 'Email',
    icon: IconsTypes.EMAIL,
    type: 'email',
  },
  {
    name: 'firstName',
    placeholder: 'First name',
    icon: IconsTypes.PROFILE,
    type: 'text',
  },
  {
    name: 'lastName',
    placeholder: 'Last name',
    icon: IconsTypes.PROFILE,
    type: 'text',
  },
  {
    name: 'password',
    placeholder: 'Password',
    icon: IconsTypes.PASSWORD,
    type: 'password',
  },
  {
    name: 'passwordConfirm',
    placeholder: 'Confirm password',
    icon: IconsTypes.PASSWORD,
    type: 'password',
  },
];

export const CHANGE_PASS_INPUTS = [
  {
    name: 'oldPassword',
    placeholder: 'Old password',
    icon: IconsTypes.PASSWORD,
    type: 'password',
  },
  {
    name: 'newPassword',
    placeholder: 'New password',
    icon: IconsTypes.PASSWORD,
    type: 'password',
  },
  {
    name: 'newPasswordConfirm',
    placeholder: 'Confirm new password',
    icon: IconsTypes.PASSWORD,
    type: 'password',
  },
];
