import { FC } from 'react';

import { MainLayout } from '@layouts';
import { TodoList, Toolbar } from '@components';

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
