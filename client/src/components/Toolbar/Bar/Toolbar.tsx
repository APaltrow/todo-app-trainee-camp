import { FC } from 'react';

import { AddTodoBlock } from '../AddTodoBlock';
import { SearchTodo } from '../SearchTodo';
import { FilterTodo } from '../FilterTodo';

import style from './Toolbar.module.scss';

export const Toolbar: FC = () => {
  return (
    <section className={style.toolbar}>
      <AddTodoBlock />
      <SearchTodo />
      <FilterTodo />
    </section>
  );
};
