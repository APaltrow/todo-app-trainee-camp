/* Formats a timestamp from '2023-09-29T05:36:51.410Z'  to '29.09.2023 08:36' */

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp).toLocaleDateString('ru-RU');
  const time = new Date(timestamp).toLocaleTimeString('ru-RU').slice(0, 5);

  return `${date} ${time}`;
};
