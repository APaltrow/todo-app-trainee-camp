import { FilterOptions, ITodoState, TodoAction, TodoActions } from '@types';

const initialState: ITodoState = {
  todoList: [],
  filterValue: FilterOptions.ALL,
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

    case TodoActions.EDIT_TODO: {
      const todo = state.todoList.find(
        (todoItem) => todoItem.id === action.payload.id,
      );

      if (!todo) return state;

      const todoIndex = state.todoList.indexOf(todo);

      state.todoList.splice(todoIndex, 1, { ...action.payload });

      return { ...state };
    }

    case TodoActions.CLEAR_DONE_TODO: {
      const updatedState = state.todoList.filter(
        (todoItem) => !todoItem.isDone,
      );

      return { ...state, todoList: [...updatedState] };
    }

    case TodoActions.SET_FILTER_TODO: {
      return { ...state, filterValue: action.payload };
    }

    default:
      return state;
  }
};
