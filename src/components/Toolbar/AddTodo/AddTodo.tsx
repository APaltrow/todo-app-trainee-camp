import { FC } from 'react';

import { useModal, useTodoTask } from '@hooks';

import { Icon, Modal, TodoForm, TaskInput, CustomButton } from '@components';

import style from './AddTodo.module.scss';

export const AddTodo: FC = () => {
  const { isOpen, onOpen, onClose } = useModal();
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

  const onCancelTodo = () => {
    const isConfirmed = window.confirm('Would you like to cancel task?');
    if (!isConfirmed) return;

    clearTodo();
    onClose();
  };
  const onSaveTodo = () => {
    onCreateTodo();
    onClose();
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
        size="md"
        variant="primary"
      >
        <Icon iconName="plus" />
      </CustomButton>

      <Modal
        isOpen={isOpen}
        onClose={onCancelTodo}
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
    </div>
  );
};
