import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { IconsTypes } from '@types';

import { CustomButton } from '../CustomButton';
import { Icon } from '../Icon';

import style from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;

  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  const rootPortal = document.getElementById('portal') as HTMLElement;

  return ReactDOM.createPortal(
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
    </div>,
    rootPortal,
  );
};
