import { FC, ReactNode, useEffect } from 'react';

import { Header, Footer } from '@components';
import { useActions } from '@redux';

import style from './MainLayout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { checkUserThunk } = useActions();

  useEffect(() => {
    checkUserThunk();
  }, []);
  console.log('asdasdasdsadsad');
  return (
    <>
      <Header />
      <main className={style.main_container}>{children}</main>
      <Footer />
    </>
  );
};
