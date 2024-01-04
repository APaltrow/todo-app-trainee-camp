import { ILoginCredentials, IAuthResponse } from '@types';
import { ApiPaths } from '@constants';
import { getTokens } from '@helpers';

import $api from './api';

export const login = async (loginCredentials: ILoginCredentials) => {
  const { data } = await $api.post<IAuthResponse>(
    ApiPaths.LOGIN,
    loginCredentials,
  );

  return data;
};

export const logout = async () => {
  const { refreshToken } = getTokens();

  const { data } = await $api.post<IAuthResponse>(ApiPaths.LOGOUT, {
    headers: {
      Authorization: refreshToken,
    },
  });

  return data;
};

export const checkAuth = async () => {
  const { refreshToken } = getTokens();

  const { data } = await $api.get<IAuthResponse>(ApiPaths.REFRESH, {
    headers: {
      Authorization: refreshToken,
    },
  });

  return data;
};
