import axios from 'axios';

import { API_URL, ApiResStatuses } from '@constants';
import { getAccessToken, removeAccessToken } from '@helpers';
import { store, logoutUser, setSearchTodo, setFilterTodo } from '@redux';
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
  (error) => {
    const { status } = error.response;

    if (status === ApiResStatuses.UNAUTHORIZED) {
      setFilterTodo(FilterOptions.ALL);
      setSearchTodo('');
      store.dispatch(logoutUser());
      removeAccessToken();
    }

    return Promise.reject(error);
  },
);

export default $api;
