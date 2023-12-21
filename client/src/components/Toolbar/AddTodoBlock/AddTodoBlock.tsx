import { FC } from 'react';

import { useAlert, useModal, useTodoTask } from '@hooks';
import { AlertMessages, ButtonSizes, ButtonVariants, IconsTypes } from '@types';

import {
  Icon,
  Modal,
  TodoForm,
  TaskInput,
  CustomButton,
  Alert,
} from '@components';

import style from './AddTodoBlock.module.scss';

export const AddTodoBlock: FC = () => {
  const [isOpen, onOpen, onClose] = useModal();

  const { alert, onAlertCall, onAlertCancel } = useAlert();

  const {
    todo,
    dateError,
    todoInputError,

    clearTodo,
    onAddTodo,
    onCreateTodo,
    onDateChange,
    onTodoTextChange,
  } = useTodoTask();

  const handleAddTodo = () => {
    onAddTodo();
    onOpen();
  };

  const onCreateTodoWithEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    onCreateTodo();
  };

  const onSaveTodo = () => {
    onCreateTodo();
    onClose();
  };

  const onCancelTodo = () => {
    clearTodo();
    onClose();
    onAlertCancel();
  };

  const handleCancelTodo = () => {
    onAlertCall({
      text: AlertMessages.CANCEL_TASK,
      onConfirm: onCancelTodo,
    });
  };

  return (
    <div className={style.container}>
      <TaskInput
        value={todo.text}
        error={todoInputError}
        placeholder="Enter your task..."
        onChange={onTodoTextChange}
        onKeyUp={onCreateTodoWithEnter}
      />
      <CustomButton
        onClick={handleAddTodo}
        size={ButtonSizes.MID}
        variant={ButtonVariants.PRIMARY}
      >
        <Icon iconName={IconsTypes.PLUS} />
      </CustomButton>

      <Modal
        isOpen={isOpen}
        onClose={handleCancelTodo}
      >
        <TodoForm
          todo={todo}
          title="Create task"
          dateError={dateError}
          todoInputError={todoInputError}
          onSaveTodo={onSaveTodo}
          onCancelTodo={onCancelTodo}
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
    </div>
  );
};