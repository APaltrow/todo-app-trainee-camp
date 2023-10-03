import { FC, memo } from 'react';

import { getDateTimeFromISO } from '@helpers';

import { Checkbox } from '@components';

import style from './TodoItem.module.scss';

interface TodoItemProps {
  id: number;
  text: string;
  isDone: boolean;
  creationDate: string;
  expirationDate: string;

  onSetDone: (id: number) => void;
}

export const TodoItem: FC<TodoItemProps> = memo(
  ({
    id,
    text,
    isDone,
    creationDate,
    expirationDate,

    onSetDone,
  }) => {
    const handleSetDone = () => onSetDone(id);

    return (
      <article className={style.container}>
        <div className={style.main}>
          <Checkbox
            id={id}
            isChecked={isDone}
            onChange={handleSetDone}
          />
          <p className={style[`text${isDone ? '_crossed' : ''}`]}>{text}</p>
        </div>

        <div className={style.footer}>
          <span>{`created at ${getDateTimeFromISO(creationDate)}`}</span>
          <span>{`expires at ${getDateTimeFromISO(expirationDate)}`}</span>
        </div>
      </article>
    );
  },
);
