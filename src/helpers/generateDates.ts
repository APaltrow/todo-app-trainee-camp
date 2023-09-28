import { formatDate } from '@helpers';

export const generateDates = () => {
  const expDate = new Date();
  expDate.setDate(expDate.getDate() + 1);
  const updatedExpDate = new Date(expDate);

  const creationDate = formatDate(new Date());
  const expirationDate = formatDate(updatedExpDate);

  return { creationDate, expirationDate };
};
