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

export const onRequest = (): AuthActions => ({
  type: AuthActionTypes.ON_REQUEST,
});

export const onSuccess = (): AuthActions => ({
  type: AuthActionTypes.ON_SUCCESS,
});

export const onError = (message: string): AuthActions => ({
  type: AuthActionTypes.ON_ERROR,
  payload: message,
});

export const uploadPhoto = (): AuthActions => ({
  type: AuthActionTypes.UPLOAD_PHOTO,
});

export const uploadPhotoSuccess = (userData: IUser): AuthActions => ({
  type: AuthActionTypes.UPLOAD_PHOTO_SUCCESS,
  payload: userData,
});

export const uploadPhotoError = (errorMessage: string): AuthActions => ({
  type: AuthActionTypes.UPLOAD_PHOTO_ERROR,
  payload: errorMessage,
});

export const resetLinkError = (errorMessage: string): AuthActions => ({
  type: AuthActionTypes.RESET_LINK_ERROR,
  payload: errorMessage,
});

export const resetPasswordError = (errorMessage: string): AuthActions => ({
  type: AuthActionTypes.RESET_PASS_ERROR,
  payload: errorMessage,
});
