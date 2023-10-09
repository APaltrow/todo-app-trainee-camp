import { FC, ReactNode } from 'react';
import { Header, Footer } from '@components';

import style from './MainLayout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <>
    <Header />
    <main className={style.main_container}>{children}</main>
    <Footer />
  </>
);
