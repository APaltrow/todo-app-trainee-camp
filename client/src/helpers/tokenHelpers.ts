import { TOKEN_KEY, TOKEN_PREFIX } from '@constants';

export const getAccessToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? `${TOKEN_PREFIX} ${token}` : '';
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
