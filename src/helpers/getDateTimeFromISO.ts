import { HOURS_MINS_LENGTH } from '@constants';

/* Formats a timestamp from '2023-09-29T05:36:51.410Z'  to '29.09.2023 08:36' */

export const getDateTimeFromISO = (timestamp: string) => {
  const date = new Date(timestamp).toLocaleDateString('ru-RU');
  const time = new Date(timestamp)
    .toLocaleTimeString('ru-RU')
    .slice(0, HOURS_MINS_LENGTH);

  return `${date} ${time}`;
};
