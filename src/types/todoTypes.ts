export interface ITodo {
  id: number;
  text: string;
  creationDate: string;
  expirationDate: string;
}

export enum TodoActions {
  ADD_TODO = 'ADD_TODO',
}
export interface ITodoState {
  todoList: ITodo[];
}
interface IAddTodoAction {
  type: TodoActions.ADD_TODO;
  payload: ITodo;
}
export type TodoAction = IAddTodoAction;
