const TOKEN_KEY = 'token';

export const getAccessToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? `Bearer ${token}` : '';
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
