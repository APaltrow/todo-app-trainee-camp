import { ITodo, TodoActions } from '@types';

export const addTodo = (newTodo: ITodo) => {
  return { type: TodoActions.ADD_TODO, payload: newTodo };
};
