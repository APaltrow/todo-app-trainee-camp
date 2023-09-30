import { FC } from 'react';

import { formatDate } from '@helpers';

import style from './TodoItem.module.scss';

interface TodoItemProps {
  text: string;
  creationDate: string;
  expirationDate: string;
}

export const TodoItem: FC<TodoItemProps> = ({
  text,
  creationDate,
  expirationDate,
}) => {
  return (
    <article className={style.container}>
      <p className={style.text}>{text}</p>
      <div className={style.footer}>
        <span>{`created at ${formatDate(creationDate)}`}</span>
        <span>{`expires at ${formatDate(expirationDate)}`}</span>
      </div>
    </article>
  );
};
