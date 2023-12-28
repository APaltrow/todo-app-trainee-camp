import axios from 'axios';

import { IAuthResponse } from '@types';
import { API_URL, ApiPaths, ApiResStatuses } from '@constants';
import { getAccessToken, removeAccessToken, setAccessToken } from '@helpers';
import { store, logoutUser } from '@redux';

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

    const isValidRequest =
      response.status === ApiResStatuses.UNAUTHORIZED &&
      config &&
      !config._isRetry;

    if (isValidRequest) {
      originalRequest._isRetry = true;

      try {
        const { data } = await axios.get<IAuthResponse>(
          `${API_URL}${ApiPaths.REFRESH}`,
          { withCredentials: true },
        );

        setAccessToken(data.accessToken);

        return $api.request(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default $api;
