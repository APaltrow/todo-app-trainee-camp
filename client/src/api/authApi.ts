import {
  ILoginCredentials,
  IAuthResponse,
  IRegistrationCredentials,
} from '@types';
import { ApiPaths } from '@constants';

import $api from './api';

export const login = async (loginCredentials: ILoginCredentials) => {
  const { data } = await $api.post<IAuthResponse>(
    ApiPaths.LOGIN,
    loginCredentials,
  );

  return data;
};

export const logout = async () => {
  const { data } = await $api.post<IAuthResponse>(ApiPaths.LOGOUT);

  return data;
};

export const checkAuth = async () => {
  const { data } = await $api.get<IAuthResponse>(ApiPaths.REFRESH);

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
