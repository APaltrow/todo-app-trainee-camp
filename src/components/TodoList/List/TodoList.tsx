import { FC } from 'react';

import { useAppSelector } from '@redux';

import { useTodoTask } from '@hooks';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { todoList } = useAppSelector((state) => state.todo);

  const { onSetDone } = useTodoTask();

  if (!todoList.length) return null;

  return (
    <section className={style.container}>
      <ul className={style.list}>
        {todoList.map(({ id, text, isDone, creationDate, expirationDate }) => (
          <li key={id}>
            <TodoItem
              id={id}
              text={text}
              isDone={isDone}
              creationDate={creationDate}
              expirationDate={expirationDate}
              onSetDone={onSetDone}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
