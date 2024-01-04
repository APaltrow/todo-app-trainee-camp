import axios, { AxiosError } from 'axios';

import { IAuthResponse } from '@types';
import { API_URL, ApiPaths, ApiResStatuses } from '@constants';
import { getTokens, removeTokens, setTokens } from '@helpers';

import { store, setSearchTodo, setFilterTodo, logoutUserSuccess } from '@redux';
import { FilterOptions } from '@types';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const { accessToken } = getTokens();

  config.headers.Authorization = accessToken;

  return config;
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    const originalRequest = config;

    const isAuthRefreshNeeded =
      response.status === ApiResStatuses.UNAUTHORIZED &&
      config &&
      !config._isRetry;

    if (isAuthRefreshNeeded) {
      originalRequest._isRetry = true;

      try {
        const { refreshToken } = getTokens();

        const { data } = await axios.get<IAuthResponse>(
          `${API_URL}${ApiPaths.REFRESH}`,
          {
            headers: {
              Authorization: refreshToken,
            },
          },
        );

        setTokens(data.accessToken, data.refreshToken);

        return $api.request(originalRequest);
      } catch (e) {
        const status = (e as AxiosError).response?.status;

        if (status === ApiResStatuses.UNAUTHORIZED) {
          setFilterTodo(FilterOptions.ALL);
          setSearchTodo('');
          removeTokens();
          store.dispatch(logoutUserSuccess());
        }

        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default $api;
