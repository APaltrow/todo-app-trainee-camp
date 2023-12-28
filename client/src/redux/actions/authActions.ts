import { AuthActionTypes, AuthActions, IUser } from '@types';

export const loginUser = (): AuthActions => ({
  type: AuthActionTypes.LOGIN_USER,
});

export const loginUserSuccess = (userData: IUser): AuthActions => ({
  type: AuthActionTypes.LOGIN_USER_SUCCESS,
  payload: userData,
});

export const loginUserError = (errorMessage: string): AuthActions => ({
  type: AuthActionTypes.LOGIN_USER_ERROR,
  payload: errorMessage,
});

export const logoutUser = (): AuthActions => ({
  type: AuthActionTypes.LOGOUT_USER,
});

export const logoutUserSuccess = (): AuthActions => ({
  type: AuthActionTypes.LOGOUT_USER_SUCCESS,
});

export const logoutUserError = (errorMessage: string): AuthActions => ({
  type: AuthActionTypes.LOGOUT_USER_ERROR,
  payload: errorMessage,
});

export const checkUser = (): AuthActions => ({
  type: AuthActionTypes.CHECK_USER,
});

export const checkUserSuccess = (userData: IUser): AuthActions => ({
  type: AuthActionTypes.CHECK_USER_SUCCESS,
  payload: userData,
});

export const checkUserError = (errorMessage: string): AuthActions => ({
  type: AuthActionTypes.CHECK_USER_ERROR,
  payload: errorMessage,
});

export const resetUserError = (): AuthActions => ({
  type: AuthActionTypes.RESET_ERROR,
});
