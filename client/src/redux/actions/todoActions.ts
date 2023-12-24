import { FilterOptions, ITodo, TodoAction, TodoActions } from '@types';

export const setTodoDone = (todoId: number | string) => {
  return { type: TodoActions.SET_TODO_DONE, payload: todoId };
};

export const deleteTodo = (todoId: number | string) => {
  return { type: TodoActions.DELETE_TODO, payload: todoId };
};

export const clearDoneTodo = () => {
  return { type: TodoActions.CLEAR_DONE_TODO };
};

export const setFilterTodo = (filterValue: FilterOptions) => {
  return { type: TodoActions.SET_FILTER_TODO, payload: filterValue };
};

export const setSearchTodo = (searchValue: string) => {
  return { type: TodoActions.SET_SEARCH_TODO, payload: searchValue };
};

export const fetchTodos = (): TodoAction => {
  return { type: TodoActions.FETCH_TODOS };
};

export const fetchTodosSuccess = (todos: ITodo[]): TodoAction => {
  return { type: TodoActions.FETCH_TODOS_SUCCESS, payload: todos };
};

export const fetchTodosError = (errorMessage: string): TodoAction => {
  return { type: TodoActions.FETCH_TODOS_ERROR, payload: errorMessage };
};

export const createTodo = (): TodoAction => {
  return { type: TodoActions.CREATE_TODO };
};

export const createTodoSuccess = (todo: ITodo): TodoAction => {
  return { type: TodoActions.CREATE_TODO_SUCCESS, payload: todo };
};

export const createTodoError = (errorMessage: string): TodoAction => {
  return { type: TodoActions.CREATE_TODO_ERROR, payload: errorMessage };
};

export const resetTodoError = (): TodoAction => {
  return { type: TodoActions.RESET_ERROR };
};

export const updateTodo = (): TodoAction => {
  return { type: TodoActions.UPDATE_TODO };
};

export const updateTodoSuccess = (todo: ITodo): TodoAction => {
  return { type: TodoActions.UPDATE_TODO_SUCCESS, payload: todo };
};

export const updateTodoError = (errorMessage: string): TodoAction => {
  return { type: TodoActions.UPDATE_TODO_ERROR, payload: errorMessage };
};
