import { FC } from 'react';

import { useFilter } from '@hooks';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { todos } = useFilter();

  if (!todos.length) return null;

  return (
    <section className={style.container}>
      <ul className={style.list}>
        {todos.map((todoItem) => (
          <li key={todoItem.id}>
            <TodoItem todo={todoItem} />
          </li>
        ))}
      </ul>
    </section>
  );
};
