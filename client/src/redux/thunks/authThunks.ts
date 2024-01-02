import { Dispatch } from 'react';

import { checkAuth, login, logout, register } from '@api';
import {
  AuthActions,
  ErrorsAlt,
  ILoginCredentials,
  IRegistrationCredentials,
} from '@types';
import {
  handleResponseError,
  removeAccessToken,
  setAccessToken,
} from '@helpers';

import {
  loginUser,
  loginUserSuccess,
  loginUserError,
  logoutUser,
  logoutUserSuccess,
  logoutUserError,
  checkUser,
  checkUserSuccess,
  checkUserError,
} from '../actions';

export const loginThunk = (loginCredentials: ILoginCredentials) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch(loginUser());

      const { accessToken, ...userData } = await login(loginCredentials);

      setAccessToken(accessToken);

      dispatch(loginUserSuccess(userData));
    } catch (error) {
      dispatch(
        loginUserError(handleResponseError(error, ErrorsAlt.FAILED_LOGIN)),
      );
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch(logoutUser());

      await logout();

      removeAccessToken();
      dispatch(logoutUserSuccess());
    } catch (error) {
      dispatch(
        logoutUserError(handleResponseError(error, ErrorsAlt.FAILED_LOGOUT)),
      );
    }
  };
};

export const checkUserThunk = () => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch(checkUser());

      const { accessToken, ...userData } = await checkAuth();

      setAccessToken(accessToken);

      dispatch(checkUserSuccess(userData));
    } catch (error) {
      dispatch(
        checkUserError(handleResponseError(error, ErrorsAlt.FAILED_CHECK)),
      );
    }
  };
};

export const registerThunk = (
  registerCredentials: IRegistrationCredentials,
) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch(loginUser());

      const { accessToken, ...userData } = await register(registerCredentials);

      setAccessToken(accessToken);

      dispatch(loginUserSuccess(userData));
    } catch (error) {
      dispatch(
        loginUserError(
          handleResponseError(error, ErrorsAlt.FAILED_REGISTRATION),
        ),
      );
    }
  };
};
