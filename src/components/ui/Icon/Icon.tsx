import { FC } from 'react';

import sprites from '@assets/sprites.svg';

import style from './Icon.module.scss';

interface IconProps {
  iconName: string;
}

export const Icon: FC<IconProps> = ({ iconName }) => {
  return (
    <svg className={style.container}>
      <use href={`${sprites}#${iconName}`} />
    </svg>
  );
};