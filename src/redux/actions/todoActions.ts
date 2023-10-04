import { ITodo, TodoActions } from '@types';

export const addTodo = (newTodo: ITodo) => {
  return { type: TodoActions.ADD_TODO, payload: newTodo };
};

export const setTodoDone = (todoId: number) => {
  return { type: TodoActions.SET_TODO_DONE, payload: todoId };
};

export const deleteTodo = (todoId: number) => {
  return { type: TodoActions.DELETE_TODO, payload: todoId };
};

export const editTodo = (editedTodo: ITodo) => {
  return { type: TodoActions.EDIT_TODO, payload: editedTodo };
};
