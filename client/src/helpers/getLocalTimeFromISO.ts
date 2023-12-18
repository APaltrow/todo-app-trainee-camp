import { MILISEC_IN_1_SEC, SEC_IN_1_MIN } from '@constants';

export const getLocalTimeFromISO = (timestamp: string) => {
  const date = new Date(timestamp);
  const withTimeDifference =
    +date - new Date().getTimezoneOffset() * SEC_IN_1_MIN * MILISEC_IN_1_SEC;

  return new Date(withTimeDifference).toISOString();
};
