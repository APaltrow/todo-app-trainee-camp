import { ITodoDocument } from '@interfaces';

export const getTodoTotals = (todos: ITodoDocument[]) => {
  return todos.reduce(
    (todoTotals, todo) => {
      if (todo.isDone) {
        todoTotals.completed += 1;

        return todoTotals;
      }

      todoTotals.active += 1;

      return todoTotals;
    },
    {
      all: todos.length,
      completed: 0,
      active: 0,
    },
  );
};
