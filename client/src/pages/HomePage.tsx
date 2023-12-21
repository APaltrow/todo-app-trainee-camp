import { FC } from 'react';

import { TodoList, Toolbar } from '@components';
import { AuthLayout } from '@layouts';

export const HomePage: FC = () => {
  return (
    <AuthLayout>
      <Toolbar />
      <TodoList />
    </AuthLayout>
  );
};
