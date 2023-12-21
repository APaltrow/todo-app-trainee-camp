import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@redux';
import { RoutesPaths } from '@constants';
import { LoginForm } from '@components';

export const LoginPage: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  const location = useLocation();

  const prevPath = location?.state?.prevUrl || RoutesPaths.MAIN;

  if (isAuth) {
    return <Navigate to={`../${prevPath}`} />;
  }

  return <LoginForm />;
};
