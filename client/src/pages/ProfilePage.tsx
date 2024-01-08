import { FC } from 'react';

import { useAppSelector } from '@redux';
import { AuthLayout } from '@layouts';
import { ChangePassForm } from '@components';

export const ProfilePage: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const email = user?.email || '';

  return (
    <AuthLayout>
      <h3>{`You are logged in with - ${email}`}</h3>
      <ChangePassForm />
    </AuthLayout>
  );
};
