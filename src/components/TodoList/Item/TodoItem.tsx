import { FC, memo } from 'react';

import { getDateTimeFromISO } from '@helpers';
import { useTodoTask } from '@hooks';
import { ITodo } from '@types';

import { Checkbox } from '@components';

import style from './TodoItem.module.scss';

interface TodoItemProps {
  todo: ITodo;
}
export const TodoItem: FC<TodoItemProps> = memo(({ todo }) => {
  const { id, text, isDone, creationDate, expirationDate } = todo;
  const { onSetDone } = useTodoTask();

  const handleSetDone = () => onSetDone(id);

  return (
    <article className={style.container}>
      <div className={style.main}>
        <Checkbox
          id={id}
          isChecked={isDone}
          onChange={handleSetDone}
        />
        <p className={`${style.text} ${isDone ? style.crossed : ''}`}>{text}</p>
      </div>

      <div className={style.footer}>
        <span>{`created at ${getDateTimeFromISO(creationDate)}`}</span>
        <span>{`expires at ${getDateTimeFromISO(expirationDate)}`}</span>
      </div>
    </article>
  );
});
