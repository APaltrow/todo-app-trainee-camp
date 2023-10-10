import { useState } from 'react';

type ModalType = () => [boolean, () => void, () => void];

export const useModal: ModalType = () => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  return [isOpen, onOpen, onClose];
};
