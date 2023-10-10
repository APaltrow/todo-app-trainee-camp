import { FC, memo } from 'react';

import { getDateTimeFromISO } from '@helpers';
import { useAlert, useModal, useTodoTask } from '@hooks';
import { ITodo, IconsTypes } from '@types';

import {
  Alert,
  Checkbox,
  CustomButton,
  Icon,
  Modal,
  TodoForm,
} from '@components';

import style from './TodoItem.module.scss';

interface TodoItemProps {
  todo: ITodo;
}

export const TodoItem: FC<TodoItemProps> = memo(({ todo }) => {
  const { id, text, isDone, creationDate, expirationDate } = todo;

  const [isOpen, onOpen, onClose] = useModal();

  const { alert, onAlertCall, onAlertCancel } = useAlert();

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
    onAlertCall({
      text: 'Would you like to delete the task?',
      onConfirm: () => {
        onDeleteTodo(id);
        onAlertCancel();
      },
    });
  };

  const handleEditTodo = () => {
    onEditTodo(todo);
    onOpen();
  };

  const handleSaveEditTodo = () => {
    onSaveEditTodo();
    onClose();
  };

  const handleCancelEditTodo = () => {
    onAlertCall({
      text: 'Would you like to cancel the editing?',
      onConfirm: () => {
        clearTodo();
        onClose();
        onAlertCancel();
      },
    });
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
          isDisabled={todo.isDone}
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

      {alert ? (
        <Alert
          text={alert.text}
          onCancel={onAlertCancel}
          onConfirm={alert.onConfirm}
        />
      ) : null}
    </article>
  );
});
