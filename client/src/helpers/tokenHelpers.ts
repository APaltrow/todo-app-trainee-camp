import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_PREFIX } from '@constants';

export const getTokens = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || '';

  return {
    accessToken: token ? `${TOKEN_PREFIX} ${token}` : '',
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || '',
  };
};

export const setTokens = (accessT: string, refreshT: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessT);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshT);
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
