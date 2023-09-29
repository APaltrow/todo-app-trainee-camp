import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

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
    <div
      className={style.overlay}
      onClick={onClose}
    >
      <div
        className={style.content}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={style.close_btn}>
          <CustomButton onClick={onClose}>
            <Icon iconName="close" />
          </CustomButton>
        </span>
        {children}
      </div>
    </div>,
    rootPortal,
  );
};
