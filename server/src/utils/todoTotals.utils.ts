import { INITIAL_AMOUNT, ONE_TODO_ITEM } from '@constants';
import { ITodoDocument } from '@interfaces';

export const getTodoTotals = (todos: ITodoDocument[]) => {
  return todos.reduce(
    (todoTotals, todo) => {
      if (todo.isDone) {
        todoTotals.completed += ONE_TODO_ITEM;

        return todoTotals;
      }

      todoTotals.active += ONE_TODO_ITEM;

      return todoTotals;
    },
    {
      all: todos.length,
      completed: INITIAL_AMOUNT,
      active: INITIAL_AMOUNT,
    },
  );
};
