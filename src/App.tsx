import { FC } from 'react';

import { TodoList, Toolbar } from '@components';

import style from '@style/App.module.scss';

export const App: FC = () => {
  return (
    <div className={style.app}>
      <main className={style.main_container}>
        <Toolbar />
        <TodoList />
      </main>
    </div>
  );
};
