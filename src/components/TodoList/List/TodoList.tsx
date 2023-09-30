import { FC } from 'react';

import { useAppSelector } from '@redux';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { todoList } = useAppSelector((state) => state.todo);

  if (!todoList.length) return null;

  return (
    <ul className={style.container}>
      {todoList.map(({ text, id, creationDate, expirationDate }) => (
        <li key={id}>
          <TodoItem
            text={text}
            creationDate={creationDate}
            expirationDate={expirationDate}
          />
        </li>
      ))}
    </ul>
  );
};
