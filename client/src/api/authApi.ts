import axios from 'axios';

import {
  ILoginCredentials,
  IAuthResponse,
  IRegistrationCredentials,
} from '@types';
import { API_URL, ApiPaths } from '@constants';
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

export const checkAuth = async (refreshToken: string) => {
  const { data } = await axios.get<IAuthResponse>(
    `${API_URL}${ApiPaths.REFRESH}`,
    {
      headers: {
        Authorization: refreshToken,
      },
    },
  );

  return data;
};

export const register = async (
  registerCredentials: IRegistrationCredentials,
) => {
  const { data } = await $api.post<IAuthResponse>(
    ApiPaths.REGISTER,
    registerCredentials,
  );

  return data;
};
