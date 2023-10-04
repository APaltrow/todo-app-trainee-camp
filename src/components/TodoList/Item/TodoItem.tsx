import { FC, memo } from 'react';

import { getDateTimeFromISO } from '@helpers';
import { useModal, useTodoTask } from '@hooks';
import { ITodo, IconsTypes } from '@types';

import { Checkbox, CustomButton, Icon, Modal, TodoForm } from '@components';

import style from './TodoItem.module.scss';

interface TodoItemProps {
  todo: ITodo;
}

export const TodoItem: FC<TodoItemProps> = memo(({ todo }) => {
  const { id, text, isDone, creationDate, expirationDate } = todo;
  const { isOpen, onOpen, onClose } = useModal();
  const {
    todo: todoEdit,
    dateError,
    todoInputError,

    clearTodo,
    onSetDone,
    onDeleteTodo,
    onEditTodo,
    onSaveEditTodo,
    onDateChange,
    onTodoTextChange,
  } = useTodoTask();

  const handleSetDone = () => onSetDone(id);

  const handleDeleteTodo = () => {
    const isConfirmed = window.confirm('Would you like to delete the task?');

    if (!isConfirmed) return;

    onDeleteTodo(id);
  };

  const handleEditTodo = () => {
    onEditTodo(todo);
    onOpen();
  };

  const handleCancelEditTodo = () => {
    const isConfirmed = window.confirm('Would you like to cancel editing?');

    if (!isConfirmed) return;

    clearTodo();
    onClose();
  };

  const handleSaveEditTodo = () => {
    onSaveEditTodo();
    onClose();
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
          onClick={handleEditTodo}
        >
          <Icon iconName={IconsTypes.EDIT} />
        </CustomButton>

        <CustomButton
          size="sm"
          onClick={handleDeleteTodo}
        >
          <Icon iconName={IconsTypes.DELETE} />
        </CustomButton>
      </div>

      <div className={style.footer}>
        <span>{`created at ${getDateTimeFromISO(creationDate)}`}</span>
        <span>{`expires at ${getDateTimeFromISO(expirationDate)}`}</span>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCancelEditTodo}
      >
        <TodoForm
          todo={todoEdit}
          title="Edit task"
          dateError={dateError}
          todoInputError={todoInputError}
          onSaveTodo={handleSaveEditTodo}
          onCancelTodo={handleCancelEditTodo}
          onDateChange={onDateChange}
          onTodoTextChange={onTodoTextChange}
        />
      </Modal>
    </article>
  );
});
