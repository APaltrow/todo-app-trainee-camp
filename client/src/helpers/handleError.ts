import { AxiosError } from 'axios';

import { ZERO_INDEX } from '@constants';
import { IResponseError } from '@types';

export const handleError = (error: IResponseError) => {
  if (!error?.errors?.length) {
    return error?.message;
  }

  return error.errors[ZERO_INDEX]?.message || error.message;
};

export const handleResponseError = (error: unknown, alt: string) => {
  const resError = (error as AxiosError)?.response?.data;

  return resError ? handleError(resError as IResponseError) : alt;
};
