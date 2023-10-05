import { useActions, useAppSelector } from '@redux';

import { FilterOptions } from '@types';

export const useFilter = () => {
  const { filterValue, todoList } = useAppSelector((state) => state.todo);

  const { clearDoneTodo, setFilterTodo } = useActions();

  const onClearDoneTodos = () => {
    const isConfirmed = window.confirm(
      'Would you like to clear completed tasks?',
    );

    if (!isConfirmed) return;

    clearDoneTodo();

    if (filterValue === FilterOptions.COMPLETED) {
      setFilterTodo(FilterOptions.ALL);
    }
  };

  const onSetFilter = (filter: FilterOptions) => setFilterTodo(filter);

  const filterTodo = (option: FilterOptions) => {
    if (option === FilterOptions.ACTIVE) {
      return todoList.filter((todo) => !todo.isDone);
    }

    return todoList.filter((todo) => todo.isDone);
  };

  const isAnyTodoDone = !!todoList.find((todo) => todo.isDone);

  const todos =
    filterValue !== FilterOptions.ALL ? filterTodo(filterValue) : todoList;

  return {
    todos,
    filterValue,
    isAnyTodoDone,

    onSetFilter,
    onClearDoneTodos,
  };
};
