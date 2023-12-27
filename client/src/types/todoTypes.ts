export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
  creationDate: string;
  expirationDate: string;
}

export interface ITodoResponse {
  todos: ITodo[];
  totals: Record<string, number>;
}

export enum TodoActions {
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
  DELETE_TODO = 'DELETE_TODO',
  DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS',
  DELETE_TODO_ERROR = 'DELETE_TODO_ERROR',
  SET_TOTALS = 'SET_TOTALS',
}

export enum FilterOptions {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface ITodoState {
  todoList: ITodo[];
  totals: Record<string, number>;
  filterValue: FilterOptions;
  searchValue: string;
  isLoading: boolean;
  error: string;
  fetchError: string;
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
  payload: ITodoResponse;
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

interface IDeleteTodoAction {
  type: TodoActions.DELETE_TODO;
}

interface IDeleteTodoSuccessAction {
  type: TodoActions.DELETE_TODO_SUCCESS;
  payload: string;
}

interface IDeleteTodoErrorAction {
  type: TodoActions.DELETE_TODO_ERROR;
  payload: string;
}

interface ISetTotalsAction {
  type: TodoActions.SET_TOTALS;
  payload: Record<string, number>;
}

export type TodoAction =
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
  | IUpdateTodoErrorAction
  | IDeleteTodoAction
  | IDeleteTodoSuccessAction
  | IDeleteTodoErrorAction
  | ISetTotalsAction;
