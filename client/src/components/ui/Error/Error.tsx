import { FC } from 'react';

import style from './Error.module.scss';

interface ErrorProps {
  message?: string;
}

export const Error: FC<ErrorProps> = ({
  message = 'Something went wrong ...',
}) => {
  return <p className={style.error}>{message}</p>;
};
