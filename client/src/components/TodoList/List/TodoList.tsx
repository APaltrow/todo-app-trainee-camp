import { FC, useEffect } from 'react';

import { useFilter } from '@hooks';
import { TODO_LIST_MESSAGES } from '@constants';
import { ErrorMessages } from '@types';
import { useActions, useAppSelector } from '@redux';
import { Info, Loader, Error } from '@components';

import tasksImg from '@assets/empty.png';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.todo);

  const { todos, filterValue, searchValue } = useFilter();
  const { fetchTodosThunk } = useActions();

  useEffect(() => {
    fetchTodosThunk();
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <Error message={error} />;

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
