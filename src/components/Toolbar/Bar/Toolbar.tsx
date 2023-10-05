import { FC } from 'react';

import { AddTodo } from '../AddTodo';
import { SearchTodo } from '../SearchTodo';
import { FilterTodo } from '../FilterTodo';

import style from './Toolbar.module.scss';

export const Toolbar: FC = () => {
  return (
    <section className={style.toolbar}>
      <AddTodo />
      <SearchTodo />
      <FilterTodo />
    </section>
  );
};
