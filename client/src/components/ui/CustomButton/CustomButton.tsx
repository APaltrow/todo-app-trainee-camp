import { FC, ReactNode } from 'react';

import { Loader } from '@components';
import { ButtonSizes, ButtonVariants } from '@types';

import style from './CustomButton.module.scss';

interface CustomButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  size?: ButtonSizes;
  variant?: ButtonVariants;
  withLoader?: boolean;
  isLoading?: boolean;

  onClick: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  isDisabled = false,
  size = ButtonSizes.DEFAULT,
  variant = ButtonVariants.DEFAULT,
  withLoader = false,
  isLoading = false,

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
      disabled={isLoading || isDisabled}
    >
      {withLoader && isLoading && <Loader withMessage={false} />}
      {children}
    </button>
  );
};
