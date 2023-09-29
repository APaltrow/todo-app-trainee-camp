import { FC } from 'react';

import { ITodo } from '@types';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

interface TodoListProps {
  todoList: ITodo[];
}

export const TodoList: FC<TodoListProps> = ({ todoList }) => {
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
