export const formatISOTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const withTimeDifference = +date - new Date().getTimezoneOffset() * 60 * 1000;

  return new Date(withTimeDifference).toISOString();
};
