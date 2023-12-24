import { FC, useEffect } from 'react';

import { useDelayedResetError, useFilter } from '@hooks';
import { TODO_LIST_MESSAGES } from '@constants';
import { ErrorMessages } from '@types';
import { useActions, useAppSelector } from '@redux';
import { Info, Loader, Error } from '@components';

import tasksImg from '@assets/empty.png';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { isLoading, fetchError } = useAppSelector((state) => state.todo);

  const { todos, filterValue, searchValue } = useFilter();

  const { fetchTodosThunk, resetTodoError } = useActions();

  useDelayedResetError(resetTodoError, fetchError);

  useEffect(() => {
    fetchTodosThunk();
  }, []);

  if (!todos.length) {
    const message = searchValue
      ? `${ErrorMessages.NOTHING_FOUND} '${searchValue}'`
      : TODO_LIST_MESSAGES[filterValue.toLowerCase()];

    return (
      <Info
        imgUrl={searchValue ? '' : tasksImg}
        message={message}
      />
    );
  }

  return (
    <section className={style.container}>
      {isLoading && <Loader />}
      {!!fetchError && <Error message={fetchError} />}
      <ul className={style.list}>
        {todos.map((todoItem) => (
          <li key={todoItem.id}>
            <TodoItem todo={todoItem} />
          </li>
        ))}
      </ul>
    </section>
  );
};
