import { FC } from 'react';

import { useTodoTask } from '@hooks';

import { TaskInput } from '@components';

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
          </div>
        </section>

        {/* TASK LIST */}
        <section>
          <ul>
            {todoList.map(({ text, id, creationDate, expirationDate }) => (
              <li key={id}>
                {id} - {text} - created at {creationDate}, expires at{' '}
                {expirationDate}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};
