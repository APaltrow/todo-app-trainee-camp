import { FC } from 'react';

import { TodoList, Toolbar } from '@components';
import { MainLayout } from '@layouts';

import style from '@style/App.module.scss';

export const App: FC = () => {
  return (
    <div className={style.app}>
      <MainLayout>
        <Toolbar />
        <TodoList />
      </MainLayout>
    </div>
  );
};
