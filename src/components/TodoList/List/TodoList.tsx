import { FC } from 'react';

import { useAppSelector } from '@redux';
import { FilterOptions } from '@types';

import { TodoItem } from '../Item';

import style from './TodoList.module.scss';

export const TodoList: FC = () => {
  const { todoList, filterValue } = useAppSelector((state) => state.todo);

  const filterTodo = (option: FilterOptions) => {
    if (option === 'Active') {
      return todoList.filter((todo) => !todo.isDone);
    }

    return todoList.filter((todo) => todo.isDone);
  };

  const todos = filterValue !== 'All' ? filterTodo(filterValue) : todoList;

  if (!todos.length) return null;
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
