import { FC } from 'react';

import { useTodoTask } from '@hooks';

import { CustomButton, Icon, TaskInput, TodoList } from '@components';

import style from '@style/App.module.scss';

export const App: FC = () => {
  const {
    todo,
    todoList,
    todoInputError,

    onTodoTextChange,
    onTodoEnter,
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
            <CustomButton onClick={() => {}}>
              <Icon iconName="plus" />
            </CustomButton>
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
