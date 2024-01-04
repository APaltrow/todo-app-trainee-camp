const { DEV, VITE_API_URL } = import.meta.env;

const DEV_API_URL = 'http://localhost:7000/api';

export const API_URL = DEV ? DEV_API_URL : VITE_API_URL;

export enum ApiPaths {
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  REFRESH = '/auth/refresh',
  REGISTER = '/auth/register',
  TODOS = '/todos',
}

export enum ApiResStatuses {
  UNAUTHORIZED = 401,
}
