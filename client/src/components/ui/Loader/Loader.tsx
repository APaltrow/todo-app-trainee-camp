import { FC } from 'react';

import { Icon } from '@components';
import { IconsTypes } from '@types';

import style from './Loader.module.scss';

interface LoaderProps {
  message?: string;
}

const DEFAULT_MESSAGE = 'Loading ...';

export const Loader: FC<LoaderProps> = ({ message = DEFAULT_MESSAGE }) => {
  return (
    <div className={style.container}>
      <span className={style.spinner}>
        <Icon iconName={IconsTypes.SPINNER} />
      </span>
      <p>{message}</p>
    </div>
  );
};
