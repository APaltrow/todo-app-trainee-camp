export interface ITodo {
  id: number;
  text: string;
  isDone: boolean;
  creationDate: string;
  expirationDate: string;
}

export enum TodoActions {
  ADD_TODO = 'ADD_TODO',
  SET_TODO_DONE = 'SET_TODO_DONE',
  DELETE_TODO = 'DELETE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  CLEAR_DONE_TODO = 'CLEAR_DONE_TODO',
  SET_FILTER_TODO = 'SET_FILTER_TODO',
}

export enum FilterOptions {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export interface ITodoState {
  todoList: ITodo[];
  filterValue: FilterOptions;
}

interface IAddTodoAction {
  type: TodoActions.ADD_TODO;
  payload: ITodo;
}
interface ISetTodoDoneAction {
  type: TodoActions.SET_TODO_DONE;
  payload: number;
}
interface IDeleteTodoAction {
  type: TodoActions.DELETE_TODO;
  payload: number;
}
interface IEditTodoAction {
  type: TodoActions.EDIT_TODO;
  payload: ITodo;
}
interface IClearDoneTodoAction {
  type: TodoActions.CLEAR_DONE_TODO;
}
interface ISetFilterTodoAction {
  type: TodoActions.SET_FILTER_TODO;
  payload: FilterOptions;
}

export type TodoAction =
  | IAddTodoAction
  | ISetTodoDoneAction
  | IDeleteTodoAction
  | IEditTodoAction
  | IClearDoneTodoAction
  | ISetFilterTodoAction;
