import { ChangeEvent, FC } from 'react';

import { ButtonSizes, ButtonVariants, ITodo } from '@types';

import { CustomButton, DateTimePicker, TaskInput } from '@components';

import style from './TodoForm.module.scss';

interface TodoFormProps {
  todo: ITodo;
  title: string;
  dateError: string;
  todoInputError: string;

  onSaveTodo: () => void;
  onCancelTodo: () => void;
  onDateChange: (timestamp: string) => void;
  onTodoTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TodoForm: FC<TodoFormProps> = ({
  todo,
  title,
  dateError,
  todoInputError,

  onSaveTodo,
  onCancelTodo,
  onDateChange,
  onTodoTextChange,
}) => {
  const isValidTodo =
    !!dateError || !!todoInputError || !todo?.expirationDate || !todo.text;

  return (
    <div className={style.container}>
      <h2>{title}</h2>
      <form
        className={style.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <TaskInput
          value={todo.text}
          error={todoInputError}
          placeholder="Enter your task..."
          onChange={onTodoTextChange}
        />
        <DateTimePicker
          title="Created"
          value={todo.creationDate}
          isReadonly
        />
        <DateTimePicker
          title="Expires"
          value={todo.expirationDate}
          error={dateError}
          onChange={onDateChange}
        />
        <div className={style.footer}>
          <CustomButton
            onClick={onCancelTodo}
            size={ButtonSizes.MID}
            variant={ButtonVariants.SECONDARY}
          >
            CANCEL
          </CustomButton>
          <CustomButton
            onClick={onSaveTodo}
            isDisabled={isValidTodo}
            size={ButtonSizes.MID}
            variant={ButtonVariants.PRIMARY}
          >
            SAVE
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
