import { FC } from 'react';

import { useModal, useTodoTask } from '@hooks';

import { CustomButton, Icon, Modal, TaskInput, TodoList } from '@components';

import style from '@style/App.module.scss';

export const App: FC = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const {
    todo,
    todoList,
    todoInputError,

    onTodoEnter,
    onTodoTextChange,
  } = useTodoTask();

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
              onKeyUp={onTodoEnter}
            />
            <CustomButton onClick={onOpen}>
              <Icon iconName="plus" />
            </CustomButton>
            <Modal
              isOpen={isOpen}
              onClose={onClose}
            >
              <div className={style.content}>MODAL CONTENT HERE</div>
            </Modal>
          </div>
        </section>

        {/* TASK LIST */}
        <section>
          <TodoList todoList={todoList} />
        </section>
      </main>
    </div>
  );
};
