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

      const todoIndex = state.todoList.indexOf(todo);
      const updatedTodo = {
        ...todo,
        isDone: !todo.isDone,
      };
      state.todoList.splice(todoIndex, 1, updatedTodo);

      return { ...state };
    }

    case TodoActions.DELETE_TODO: {
      const updatedList = state.todoList.filter(
        (todo) => todo.id !== action.payload,
      );

      return { ...state, todoList: [...updatedList] };
    }

    default:
      return state;
  }
};
