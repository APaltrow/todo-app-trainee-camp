/* Creates timestamps for current date and expiration date => (current date + 1 day) */

export const getCreationExpirationDates = (daysGap: number) => {
  const expDate = new Date();
  expDate.setDate(expDate.getDate() + daysGap);

  const currDate = new Date();

  const creationDate = currDate.toISOString();
  const expirationDate = expDate.toISOString();

  return { creationDate, expirationDate };
};
