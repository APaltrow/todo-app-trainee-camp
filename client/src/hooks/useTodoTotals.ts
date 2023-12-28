import { ONE_TODO_ITEM, ZERO_TODOS } from '@constants';
import { useAppSelector } from '@redux';

export const useTodoTotals = () => {
  const { totals } = useAppSelector((state) => state.todo);

  const getTotalsOnCreate = () => {
    const { all, active } = totals;
    return {
      all: all + ONE_TODO_ITEM,
      active: active + ONE_TODO_ITEM,
    };
  };

  const getTotalsOnDeleteOne = (isDone: boolean): Record<string, number> => {
    const { all, active, completed } = totals;

    if (isDone) {
      return {
        all: all - ONE_TODO_ITEM,
        completed: completed - ONE_TODO_ITEM,
      };
    }

    return {
      all: all - ONE_TODO_ITEM,
      active: active - ONE_TODO_ITEM,
    };
  };

  const getTotalsOnDeleteAll = () => {
    const { all, completed } = totals;

    return {
      all: all - completed,
      completed: ZERO_TODOS,
    };
  };

  return {
    getTotalsOnCreate,
    getTotalsOnDeleteOne,
    getTotalsOnDeleteAll,
  };
};
