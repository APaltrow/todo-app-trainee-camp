import { HOURS_MINS_LENGTH } from '@constants';

export const getDateTimeFromISO = (timestamp: string) => {
  const date = new Date(timestamp).toLocaleDateString('ru-RU');
  const time = new Date(timestamp)
    .toLocaleTimeString('ru-RU')
    .slice(0, HOURS_MINS_LENGTH);

  return `${date} ${time}`;
};
