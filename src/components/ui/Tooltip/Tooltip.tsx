import { FC, ReactNode } from 'react';

import { MAX_TOOLTIP_VALUE, TOOLTIP_OVERVALUE } from '@constants';

import style from './Tooltip.module.scss';

interface TooltipProps {
  children: ReactNode;
  value: number | null;
}

export const Tooltip: FC<TooltipProps> = ({ children, value }) => {
  return (
    <span className={style.container}>
      {value ? (
        <span className={style.tooltip}>
          {value > MAX_TOOLTIP_VALUE ? TOOLTIP_OVERVALUE : value}
        </span>
      ) : null}
      {children}
    </span>
  );
};
