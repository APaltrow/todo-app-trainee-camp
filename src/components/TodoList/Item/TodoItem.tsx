import { FC, memo } from 'react';

import { getDateTimeFromISO } from '@helpers';
import { useTodoTask } from '@hooks';
import { ITodo } from '@types';

import { Checkbox, CustomButton, Icon } from '@components';

import style from './TodoItem.module.scss';

interface TodoItemProps {
  todo: ITodo;
}
export const TodoItem: FC<TodoItemProps> = memo(({ todo }) => {
  const { id, text, isDone, creationDate, expirationDate } = todo;
  const { onSetDone, onDeleteTodo } = useTodoTask();

  const handleSetDone = () => onSetDone(id);
  const handleDeleteTodo = () => {
    const isConfirmed = window.confirm('Would you like to delete the task?');

    if (!isConfirmed) return;

    onDeleteTodo(id);
  };

  return (
    <article className={style.container}>
      <div className={style.main}>
        <Checkbox
          id={id}
          isChecked={isDone}
          onChange={handleSetDone}
        />
        <p className={`${style.text} ${isDone ? style.crossed : ''}`}>{text}</p>
        <CustomButton
          size="sm"
          onClick={handleDeleteTodo}
        >
          <Icon iconName="delete" />
        </CustomButton>
      </div>

      <div className={style.footer}>
        <span>{`created at ${getDateTimeFromISO(creationDate)}`}</span>
        <span>{`expires at ${getDateTimeFromISO(expirationDate)}`}</span>
      </div>
    </article>
  );
});
