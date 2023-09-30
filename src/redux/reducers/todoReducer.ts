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
      return { ...state, todoList: [...state.todoList, action.payload] };

    default:
      return state;
  }
};
