import { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const NO_SCROLL_CLASS = 'no-scroll';
const PORTAL_ID = 'portal';

export const Portal: FC<PortalProps> = ({ children }) => {
  const rootPortal = document.getElementById(PORTAL_ID) as HTMLElement;

  useEffect(() => {
    if (rootPortal.childNodes.length) {
      document.body.classList.add(NO_SCROLL_CLASS);
    }

    return () => {
      if (rootPortal.childNodes.length) return;

      document.body.classList.remove(NO_SCROLL_CLASS);
    };
  }, [rootPortal.childNodes.length]);

  return ReactDOM.createPortal(children, rootPortal);
};
