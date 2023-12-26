export const checkIsEmptyString = (str: string) => {
  if (!str.length) return;

  return !/\S/.test(str);
};
