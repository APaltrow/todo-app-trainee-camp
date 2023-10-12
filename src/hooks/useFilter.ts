import { useActions, useAppSelector } from '@redux';

import { FilterOptions, ITodo } from '@types';

export const useFilter = () => {
  const { filterValue, searchValue, todoList } = useAppSelector(
    (state) => state.todo,
  );

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

  const filterTodos = (option: FilterOptions) => {
    if (option === FilterOptions.ALL) {
      return todoList;
    }

    if (option === FilterOptions.ACTIVE) {
      return todoList.filter((todo) => !todo.isDone);
    }

    return todoList.filter((todo) => todo.isDone);
  };

  const searchTodos = (filteredList: ITodo[], searchText: string) => {
    if (!searchText) return filteredList;

    return filteredList.filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  const todos = searchTodos(filterTodos(filterValue), searchValue);

  return {
    todos,
    filterValue,
    searchValue,

    onSetFilter,
    onClearDoneTodos,
  };
};
