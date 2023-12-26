export interface ITodo {
  id: number | string;
  text: string;
  isDone: boolean;
  creationDate: string;
  expirationDate: string;
}

export enum TodoActions {
  DELETE_TODO = 'DELETE_TODO',
  CLEAR_DONE_TODO = 'CLEAR_DONE_TODO',
  SET_FILTER_TODO = 'SET_FILTER_TODO',
  SET_SEARCH_TODO = 'SET_SEARCH_TODO',
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  CREATE_TODO = 'CREATE_TODO',
  CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS',
  CREATE_TODO_ERROR = 'CREATE_TODO_ERROR',
  RESET_ERROR = 'RESET_ERROR',
  UPDATE_TODO = 'UPDATE_TODO',
  UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR',
}

export enum FilterOptions {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export interface ITodoState {
  todoList: ITodo[];
  filterValue: FilterOptions;
  searchValue: string;
  isLoading: boolean;
  error: string;
  fetchError: string;
}

interface IDeleteTodoAction {
  type: TodoActions.DELETE_TODO;
  payload: number;
}

interface IClearDoneTodoAction {
  type: TodoActions.CLEAR_DONE_TODO;
}

interface ISetFilterTodoAction {
  type: TodoActions.SET_FILTER_TODO;
  payload: FilterOptions;
}

interface ISetSearchTodoAction {
  type: TodoActions.SET_SEARCH_TODO;
  payload: string;
}

interface IFetchTodosAction {
  type: TodoActions.FETCH_TODOS;
}

interface IFetchTodosSuccessAction {
  type: TodoActions.FETCH_TODOS_SUCCESS;
  payload: ITodo[];
}

interface IFetchTodosErrorAction {
  type: TodoActions.FETCH_TODOS_ERROR;
  payload: string;
}

interface ICreateTodoAction {
  type: TodoActions.CREATE_TODO;
}

interface ICreateTodoSuccessAction {
  type: TodoActions.CREATE_TODO_SUCCESS;
  payload: ITodo;
}

interface ICreateTodoErrorAction {
  type: TodoActions.CREATE_TODO_ERROR;
  payload: string;
}

interface IResetTodoErrorAction {
  type: TodoActions.RESET_ERROR;
}

interface IUpdateTodoAction {
  type: TodoActions.UPDATE_TODO;
}

interface IUpdateTodoSuccessAction {
  type: TodoActions.UPDATE_TODO_SUCCESS;
  payload: ITodo;
}

interface IUpdateTodoErrorAction {
  type: TodoActions.UPDATE_TODO_ERROR;
  payload: string;
}

export type TodoAction =
  | IDeleteTodoAction
  | IClearDoneTodoAction
  | ISetFilterTodoAction
  | ISetSearchTodoAction
  | IFetchTodosAction
  | IFetchTodosSuccessAction
  | IFetchTodosErrorAction
  | ICreateTodoAction
  | ICreateTodoSuccessAction
  | ICreateTodoErrorAction
  | IResetTodoErrorAction
  | IUpdateTodoAction
  | IUpdateTodoSuccessAction
  | IUpdateTodoErrorAction;
