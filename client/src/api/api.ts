import axios from 'axios';

import { API_URL } from '@constants';
import { getAccessToken } from '@helpers';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = getAccessToken();

  return config;
});

export default $api;
