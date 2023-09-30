export const validateDates = (timestamp1: string, timestamp2: string) => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return date1 < date2;
};
