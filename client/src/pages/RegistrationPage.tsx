import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { RegistrationForm } from '@components';
import { useAppSelector } from '@redux';
import { RoutesPaths } from '@constants';

export const RegistrationPage: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth) {
    return <Navigate to={`../${RoutesPaths.MAIN}`} />;
  }

  return <RegistrationForm />;
};
