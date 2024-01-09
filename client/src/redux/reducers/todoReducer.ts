import { FilterOptions, ITodoState, TodoAction, TodoActions } from '@types';

const initialState: ITodoState = {
  todoList: [],
  totals: {
    all: 0,
    active: 0,
    completed: 0,
  },
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
    case TodoActions.SET_FILTER_TODO: {
      return { ...state, filterValue: action.payload };
    }

    case TodoActions.SET_SEARCH_TODO: {
      return { ...state, searchValue: action.payload };
    }

    case TodoActions.FETCH_TODOS: {
      return {
        ...state,
        todoList: [],
        isLoading: true,
        error: '',
        fetchError: '',
      };
    }

    case TodoActions.FETCH_TODOS_SUCCESS: {
      return {
        ...state,
        todoList: action.payload.todos,
        totals: action.payload.totals,
        isLoading: false,
        error: '',
        fetchError: '',
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
        fetchError: '',
      };
    }

    case TodoActions.CREATE_TODO_SUCCESS: {
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
        isLoading: false,
        error: '',
        fetchError: '',
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

    case TodoActions.UPDATE_TODO: {
      return {
        ...state,
        isLoading: true,
        error: '',
        fetchError: '',
      };
    }

    case TodoActions.UPDATE_TODO_SUCCESS: {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id !== action.payload.id) return todo;

          return { ...action.payload };
        }),
        isLoading: false,
        error: '',
        fetchError: '',
      };
    }

    case TodoActions.UPDATE_TODO_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case TodoActions.DELETE_TODO: {
      return {
        ...state,
        isLoading: true,
        error: '',
        fetchError: '',
      };
    }

    case TodoActions.DELETE_TODO_SUCCESS: {
      return {
        ...state,
        todoList: state.todoList.filter(({ id }) => id !== action.payload),
        isLoading: false,
        error: '',
        fetchError: '',
      };
    }

    case TodoActions.DELETE_TODO_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case TodoActions.CLEAR_DONE_TODO: {
      const updatedState = state.todoList.filter(
        (todoItem) => !todoItem.isDone,
      );

      return {
        ...state,
        todoList: updatedState,
        isLoading: false,
        error: '',
        fetchError: '',
      };
    }

    case TodoActions.SET_TOTALS: {
      return {
        ...state,
        totals: {
          ...state.totals,
          ...action.payload,
        },
      };
    }

    case TodoActions.RESET_TODOS: {
      return {
        ...state,
        todoList: [],
        totals: {
          all: 0,
          active: 0,
          completed: 0,
        },
      };
    }

    default:
      return state;
  }
};
