import { FC } from 'react';

import { useFilter } from '@hooks';
import { TODO_LIST_MESSAGES } from '@constants';

import { Info } from '@components';

import tasksImg from '@assets/empty.png';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { todos, filterValue } = useFilter();

  if (!todos.length) {
    return (
      <Info
        imgUrl={tasksImg}
        message={TODO_LIST_MESSAGES[filterValue.toLowerCase()]}
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
