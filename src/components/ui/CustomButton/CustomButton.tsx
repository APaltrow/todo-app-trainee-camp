import { FC, ReactNode } from 'react';

import { ButtonSizes, ButtonVariants } from '@types';

import style from './CustomButton.module.scss';

interface CustomButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  size?: ButtonSizes;
  variant?: ButtonVariants;

  onClick: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  isDisabled = false,
  size = ButtonSizes.DEFAULT,
  variant = ButtonVariants.DEFAULT,

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
