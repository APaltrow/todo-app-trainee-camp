import { FC, ReactNode } from 'react';

import { IconsTypes } from '@types';

import { CustomButton, Icon, Portal } from '@components';

import style from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;

  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={style.overlay}>
        <div className={style.content}>
          <span className={style.close_btn}>
            <CustomButton
              onClick={onClose}
              size="sm"
            >
              <Icon iconName={IconsTypes.CLOSE} />
            </CustomButton>
          </span>
          {children}
        </div>
      </div>
    </Portal>
  );
};
