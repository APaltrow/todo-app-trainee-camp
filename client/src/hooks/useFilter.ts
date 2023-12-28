import { ALL_COMPLETED } from '@constants';
import { useActions, useAppSelector } from '@redux';
import { FilterOptions } from '@types';
import { useTodoTotals } from '@hooks';

export const useFilter = () => {
  const { filterValue, searchValue } = useAppSelector((state) => state.todo);

  const { deleteTodoThunk, setFilterTodo, setTodoTotals } = useActions();

  const { getTotalsOnDeleteAll } = useTodoTotals();

  const onClearDoneTodos = async () => {
    const isSuccess = await deleteTodoThunk(ALL_COMPLETED);

    if (!isSuccess) return;

    setTodoTotals(getTotalsOnDeleteAll());

    if (filterValue === FilterOptions.COMPLETED) {
      setFilterTodo(FilterOptions.ALL);
    }
  };

  const onSetFilter = (filter: FilterOptions) => setFilterTodo(filter);

  return {
    filterValue,
    searchValue,

    onSetFilter,
    onClearDoneTodos,
  };
};
