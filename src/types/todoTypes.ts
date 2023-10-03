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
}
export interface ITodoState {
  todoList: ITodo[];
}
interface IAddTodoAction {
  type: TodoActions.ADD_TODO;
  payload: ITodo;
}
interface ISetTodoDoneAction {
  type: TodoActions.SET_TODO_DONE;
  payload: number;
}
export type TodoAction = IAddTodoAction | ISetTodoDoneAction;
