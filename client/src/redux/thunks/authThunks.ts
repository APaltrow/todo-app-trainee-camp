import { Dispatch } from 'react';

import { checkAuth, login, logout, register } from '@api';
import {
  AuthActions,
  ErrorsAlt,
  FilterOptions,
  ILoginCredentials,
  TodoAction,
  IRegistrationCredentials,
} from '@types';
import {
  getTokens,
  handleResponseError,
  removeTokens,
  setTokens,
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
  setFilterTodo,
  setSearchTodo,
} from '../actions';

export const loginThunk = (loginCredentials: ILoginCredentials) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch(loginUser());

      const { accessToken, refreshToken, ...userData } =
        await login(loginCredentials);

      setTokens(accessToken, refreshToken);

      dispatch(loginUserSuccess(userData));
    } catch (error) {
      dispatch(
        loginUserError(handleResponseError(error, ErrorsAlt.FAILED_LOGIN)),
      );
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch: Dispatch<AuthActions | TodoAction>) => {
    try {
      dispatch(logoutUser());

      await logout();

      dispatch(setFilterTodo(FilterOptions.ALL));
      dispatch(setSearchTodo(''));
      removeTokens();
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
    const { refreshToken: oldToken } = getTokens();

    if (!oldToken) return;

    try {
      dispatch(checkUser());

      const { accessToken, refreshToken, ...userData } =
        await checkAuth(oldToken);

      setTokens(accessToken, refreshToken);

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

      const { accessToken, refreshToken, ...userData } =
        await register(registerCredentials);

      setTokens(accessToken, refreshToken);

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
