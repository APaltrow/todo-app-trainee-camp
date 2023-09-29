import { FC, ReactNode } from 'react';

import style from './CustomButton.module.scss';

interface CustomButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  onClick: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      className={style.container}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
