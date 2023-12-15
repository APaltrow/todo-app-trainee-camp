import { FC } from 'react';

import { ButtonVariants, IconsTypes } from '@types';
import { CustomButton, Icon, Portal } from '@components';

import style from './Alert.module.scss';

interface AlertProps {
  text: string;

  onCancel: () => void;
  onConfirm: () => void;
}

export const Alert: FC<AlertProps> = ({
  text,

  onCancel,
  onConfirm,
}) => {
  return (
    <Portal>
      <div className={style.overlay}>
        <div className={style.container}>
          <span className={style.icon}>
            <Icon iconName={IconsTypes.ALERT} />
          </span>
          <div className={style.content}>
            <p>{text}</p>
            <div className={style.footer}>
              <CustomButton
                onClick={onCancel}
                variant={ButtonVariants.SECONDARY}
              >
                No
              </CustomButton>
              <CustomButton
                onClick={onConfirm}
                variant={ButtonVariants.PRIMARY}
              >
                Yes
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
