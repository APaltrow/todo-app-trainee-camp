import { FC, memo } from 'react';

import { checkIfDateBigger, getDateTimeFromISO } from '@helpers';
import { useAlert, useModal, useTodoTask } from '@hooks';
import { AlertMessages, ButtonSizes, ITodo, IconsTypes } from '@types';

import {
  Alert,
  Checkbox,
  CustomButton,
  Icon,
  Modal,
  TodoForm,
} from '@components';

import style from './TodoItem.module.scss';
import { useAppSelector } from '@/redux';

interface TodoItemProps {
  todo: ITodo;
}

export const TodoItem: FC<TodoItemProps> = memo(({ todo }) => {
  const { id, text, isDone, creationDate, expirationDate } = todo;

  const { isLoading, error } = useAppSelector((state) => state.todo);

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
      text: AlertMessages.DELETE_TASK,
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

  const handleSaveEditTodo = () => onSaveEditTodo(onClose);

  const onCancelEditTodo = () => {
    clearTodo();
    onClose();
    onAlertCancel();
  };

  const handleCancelEditTodo = () => {
    onAlertCall({
      text: AlertMessages.CANCEL_EDITING,
      onConfirm: onCancelEditTodo,
    });
  };

  const isExpired = checkIfDateBigger(new Date().toISOString(), expirationDate);

  return (
    <article className={`${style.container} ${isExpired ? style.expired : ''}`}>
      <div className={style.main}>
        <Checkbox
          isChecked={isDone}
          onChange={handleSetDone}
          isDisabled={isExpired}
        />
        <p className={`${style.text} ${isDone ? style.crossed : ''}`}>{text}</p>

        <CustomButton
          size={ButtonSizes.SMALL}
          isDisabled={todo.isDone}
          onClick={handleEditTodo}
        >
          <Icon iconName={IconsTypes.EDIT} />
        </CustomButton>

        <CustomButton
          size={ButtonSizes.SMALL}
          onClick={handleDeleteTodo}
        >
          <Icon iconName={IconsTypes.DELETE} />
        </CustomButton>
      </div>

      <div className={style.footer}>
        <span>{`created ${getDateTimeFromISO(creationDate)}`}</span>
        {isExpired ? (
          <span className={style.expired_text}>EXPIRED</span>
        ) : (
          <span>{`expires ${getDateTimeFromISO(expirationDate)}`}</span>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCancelEditTodo}
      >
        <TodoForm
          isLoading={isLoading}
          error={error}
          todo={todoEdit}
          title="Edit task"
          dateError={dateError}
          todoInputError={todoInputError}
          onSaveTodo={handleSaveEditTodo}
          onCancelTodo={onCancelEditTodo}
          onDateChange={onDateChange}
          onTodoTextChange={onTodoTextChange}
        />
      </Modal>

      {!!alert && (
        <Alert
          text={alert.text}
          onCancel={onAlertCancel}
          onConfirm={alert.onConfirm}
        />
      )}
    </article>
  );
});
