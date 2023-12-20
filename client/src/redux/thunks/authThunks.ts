import { Dispatch } from 'react';

import { login } from '@api';
import { AuthActions, ErrorsAlt, ILoginCredentials } from '@types';
import { handleResponseError, setAccessToken } from '@helpers';

import { loginUser, loginUserSuccess, loginUserError } from '../actions';

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
