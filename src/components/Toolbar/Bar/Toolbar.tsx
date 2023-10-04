import { FC } from 'react';

import { AddTodo } from '../AddTodo';
import { FilterTodo } from '../FilterTodo';

import style from './Toolbar.module.scss';

export const Toolbar: FC = () => {
  return (
    <section className={style.toolbar}>
      <AddTodo />
      <FilterTodo />
    </section>
  );
};
