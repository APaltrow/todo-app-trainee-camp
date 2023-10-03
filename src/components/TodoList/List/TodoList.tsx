import { FC } from 'react';

import { useAppSelector } from '@redux';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { todoList } = useAppSelector((state) => state.todo);

  if (!todoList.length) return null;

  return (
    <section className={style.container}>
      <ul className={style.list}>
        {todoList.map((todoItem) => (
          <li key={todoItem.id}>
            <TodoItem todo={todoItem} />
          </li>
        ))}
      </ul>
    </section>
  );
};
