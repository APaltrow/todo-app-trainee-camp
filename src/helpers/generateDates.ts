/* Creates timestamps for current date and expiration date => (current date + 1 day) */

export const generateDates = () => {
  const expDate = new Date();
  expDate.setDate(expDate.getDate() + 1);

  const creationDate = new Date().toISOString();
  const expirationDate = expDate.toISOString();

  return { creationDate, expirationDate };
};
