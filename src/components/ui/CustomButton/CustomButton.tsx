import { FC, ReactNode } from 'react';

import style from './CustomButton.module.scss';

interface CustomButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  size?: 'default' | 'sm' | 'md';
  variant?: 'default' | 'primary' | 'secondary';

  onClick: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  isDisabled = false,
  size = 'default',
  variant = 'default',

  onClick,
}) => {
  const classes = `${style.button} ${style[`size_${size}`]} ${
    style[`variant_${variant}`]
  }`;

  return (
    <button
      className={classes}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
