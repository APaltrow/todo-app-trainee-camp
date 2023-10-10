import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const rootPortal = document.getElementById('portal') as HTMLElement;

  return ReactDOM.createPortal(children, rootPortal);
};
