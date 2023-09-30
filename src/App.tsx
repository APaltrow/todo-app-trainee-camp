import { FC } from 'react';

import { useModal, useTodoTask } from '@hooks';

import {
  Icon,
  Modal,
  TodoForm,
  TodoList,
  TaskInput,
  CustomButton,
} from '@components';

import style from '@style/App.module.scss';

export const App: FC = () => {
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
    <div className={style.app}>
      <main className={style.main_container}>
        {/* TOOLBAR */}
        <section>
          <div className={style.add_task_container}>
            <TaskInput
              value={todo.text}
              error={todoInputError}
              placeholder="Enter your task..."
              onChange={onTodoTextChange}
              onKeyUp={onCreateTodoWithEnter}
            />
            <CustomButton onClick={handleAddTodo}>
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
        </section>

        {/* TASK LIST */}
        <section>
          <TodoList />
        </section>
      </main>
    </div>
  );
};
