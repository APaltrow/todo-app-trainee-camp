import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@redux';
import { RoutesPaths } from '@constants';
import { LoginForm } from '@components';

export const LoginPage: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth) {
    return <Navigate to={`../${RoutesPaths.MAIN}`} />;
  }

  return <LoginForm />;
};
