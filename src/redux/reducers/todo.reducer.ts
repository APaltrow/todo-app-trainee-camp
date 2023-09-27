/* TODO: refactor and split types separately */

/* TODO: set up correct types for todo list */
enum TodoActions {
  ADD_TODO = 'ADD_TODO',
  ADD_DELETE = 'ADD_DELETE',
}
/* TODO: set up correct fields for todo DTO */
interface ITodo {
  id: string;
  text: string;
}

interface IAddTodoAction {
  type: TodoActions;
  payload: ITodo;
}
interface IDeleteTodoAction {
  type: TodoActions;
  payload: ITodo;
}

type ITodoAction = IAddTodoAction | IDeleteTodoAction;

interface ITodoState {
  todoList: ITodo[];
}

const initialState: ITodoState = {
  todoList: [],
};

export const todoReducer = (
  state = initialState,
  action: ITodoAction,
): ITodoState => {
  switch (action.type) {
    case TodoActions.ADD_TODO:
      return { ...state, todoList: [...state.todoList, action.payload] };

    default:
      return state;
  }
};
