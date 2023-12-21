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
