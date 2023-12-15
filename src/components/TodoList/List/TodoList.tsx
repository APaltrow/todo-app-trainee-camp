import { FC } from 'react';

import { useFilter } from '@hooks';
import { TODO_LIST_MESSAGES } from '@constants';
import { ErrorMessages } from '@types';

import { Info } from '@components';

import tasksImg from '@assets/empty.png';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { todos, filterValue, searchValue } = useFilter();

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
