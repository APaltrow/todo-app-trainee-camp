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
  const err = error as AxiosError;
  const resError = err?.response?.data as IResponseError;

  return resError ? handleError(resError) : alt;
};
