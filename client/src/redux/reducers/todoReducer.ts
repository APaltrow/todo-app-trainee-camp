import { FilterOptions, ITodoState, TodoAction, TodoActions } from '@types';

const initialState: ITodoState = {
  todoList: [],
  filterValue: FilterOptions.ALL,
  searchValue: '',
  isLoading: false,
  error: '',
  fetchError: '',
};

export const todoReducer = (
  state = initialState,
  action: TodoAction,
): ITodoState => {
  switch (action.type) {
    case TodoActions.SET_TODO_DONE: {
      const updatedList = state.todoList.map((todo) => {
        if (todo.id !== action.payload) return todo;

        return { ...todo, isDone: !todo.isDone };
      });

      return { ...state, todoList: updatedList };
    }

    case TodoActions.DELETE_TODO: {
      const updatedList = state.todoList.filter(
        (todo) => todo.id !== action.payload,
      );

      return { ...state, todoList: updatedList };
    }

    case TodoActions.EDIT_TODO: {
      const updatedList = state.todoList.map((todo) => {
        if (todo.id !== action.payload.id) return todo;

        return { ...action.payload };
      });

      return { ...state, todoList: updatedList };
    }

    case TodoActions.CLEAR_DONE_TODO: {
      const updatedState = state.todoList.filter(
        (todoItem) => !todoItem.isDone,
      );

      return { ...state, todoList: updatedState };
    }

    case TodoActions.SET_FILTER_TODO: {
      return { ...state, filterValue: action.payload };
    }

    case TodoActions.SET_SEARCH_TODO: {
      return { ...state, searchValue: action.payload };
    }

    case TodoActions.FETCH_TODOS: {
      return { ...state, todoList: [], isLoading: true, error: '' };
    }

    case TodoActions.FETCH_TODOS_SUCCESS: {
      return {
        ...state,
        todoList: action.payload,
        isLoading: false,
        error: '',
      };
    }

    case TodoActions.FETCH_TODOS_ERROR: {
      return {
        ...state,
        todoList: [],
        isLoading: false,
        fetchError: action.payload,
      };
    }

    case TodoActions.CREATE_TODO: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }

    case TodoActions.CREATE_TODO_SUCCESS: {
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
        isLoading: false,
        error: '',
      };
    }

    case TodoActions.CREATE_TODO_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case TodoActions.RESET_ERROR: {
      return {
        ...state,
        error: '',
        fetchError: '',
      };
    }

    default:
      return state;
  }
};
