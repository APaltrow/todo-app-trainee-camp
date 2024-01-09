import { FC } from 'react';

import { AuthLayout } from '@layouts';
import { ChangePassForm } from '@components';

export const ProfilePage: FC = () => {
  return (
    <AuthLayout>
      <ChangePassForm />
    </AuthLayout>
  );
};
