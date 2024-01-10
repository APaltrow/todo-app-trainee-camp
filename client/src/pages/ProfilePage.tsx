import { FC } from 'react';

import { AuthLayout } from '@layouts';
import { ChangePassForm, Profile } from '@components';

export const ProfilePage: FC = () => {
  return (
    <AuthLayout>
      <Profile />
    </AuthLayout>
  );
};
