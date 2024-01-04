import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { RoutesPaths } from '@constants';
import { useAppSelector } from '@redux';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!isAuth) {
    return (
      <Navigate
        to={`../${RoutesPaths.LOGIN}`}
        state={{ prevUrl: pathname }}
      />
    );
  }

  return children;
};
