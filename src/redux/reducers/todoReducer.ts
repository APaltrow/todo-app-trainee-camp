import { ITodoState, TodoAction, TodoActions } from '@types';

const initialState: ITodoState = {
  todoList: [],
};

export const todoReducer = (
  state = initialState,
  action: TodoAction,
): ITodoState => {
  switch (action.type) {
    case TodoActions.ADD_TODO:
      return { ...state, todoList: [action.payload, ...state.todoList] };

    case TodoActions.SET_TODO_DONE: {
      const todo = state.todoList.find(
        (todoItem) => todoItem.id === action.payload,
      );

      if (!todo) return state;

      todo.isDone = !todo.isDone;

      return { ...state };
    }

    default:
      return state;
  }
};
