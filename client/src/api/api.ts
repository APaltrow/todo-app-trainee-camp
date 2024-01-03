import axios, { AxiosError } from 'axios';

import { IAuthResponse } from '@types';
import { API_URL, ApiPaths, ApiResStatuses } from '@constants';
import { getAccessToken, removeAccessToken, setAccessToken } from '@helpers';

import { store, logoutUserSuccess, setSearchTodo, setFilterTodo } from '@redux';
import { FilterOptions } from '@types';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = getAccessToken();

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
        const { data } = await axios.get<IAuthResponse>(
          `${API_URL}${ApiPaths.REFRESH}`,
          { withCredentials: true },
        );

        setAccessToken(data.accessToken);

        return $api.request(originalRequest);
      } catch (e) {
        const status = (e as AxiosError).response?.status;

        if (status === ApiResStatuses.UNAUTHORIZED) {
          setFilterTodo(FilterOptions.ALL);
          setSearchTodo('');
          removeAccessToken();
          store.dispatch(logoutUserSuccess());
        }

        return Promise.reject(e);
      }
    }
  },
);

export default $api;
