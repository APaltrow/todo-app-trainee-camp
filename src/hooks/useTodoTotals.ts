import { useMemo } from 'react';

import { useAppSelector } from '@redux';
import { FilterOptions } from '@types';

type Totals = Record<FilterOptions, number>;

export const useTodoTotals = () => {
  const { todoList } = useAppSelector((state) => state.todo);

  const initialTotals: Totals = {
    All: todoList.length,
    Active: 0,
    Completed: 0,
  };

  if (!todoList.length) return initialTotals;

  const totals: Totals = useMemo(
    () =>
      todoList.reduce((todoTotals, todo) => {
        if (todo.isDone) {
          todoTotals.Completed += 1;
        } else {
          todoTotals.Active += 1;
        }

        return todoTotals;
      }, initialTotals),
    [todoList],
  );

  return totals;
};
