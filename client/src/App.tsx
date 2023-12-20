import { FC } from 'react';

import { MainLayout } from '@layouts';

import style from '@style/App.module.scss';
import { Outlet } from 'react-router-dom';

export const App: FC = () => {
  return (
    <div className={style.app}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
};
