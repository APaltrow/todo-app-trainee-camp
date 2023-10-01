import { FC } from 'react';

import { AddTodo } from '../AddTodo';

import style from './Toolbar.module.scss';

export const Toolbar: FC = () => {
  return (
    <section className={style.toolbar}>
      <AddTodo />
    </section>
  );
};
