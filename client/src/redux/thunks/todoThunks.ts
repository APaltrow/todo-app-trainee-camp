import { Dispatch } from 'react';
import { AxiosError } from 'axios';

import {
  fetchAllTodos,
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchUpdateTodo,
} from '@api';
import { ALL_COMPLETED, ApiResStatuses } from '@constants';
import { handleResponseError } from '@helpers';
import { AuthActions, ErrorsAlt, ITodo, TodoAction } from '@types';

import {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosError,
  logoutUser,
  createTodo,
  createTodoSuccess,
  createTodoError,
  updateTodoSuccess,
  updateTodo,
  updateTodoError,
  deleteTodo,
  deleteTodoError,
  deleteTodoSuccess,
  clearDoneTodo,
} from '../actions';

export const fetchTodosThunk = () => {
  return async (dispatch: Dispatch<TodoAction | AuthActions>) => {
    try {
      dispatch(fetchTodos());

      const todos = await fetchAllTodos();

      dispatch(fetchTodosSuccess(todos));
    } catch (error) {
      const resStatus = (error as AxiosError)?.response?.status;

      if (resStatus && resStatus === ApiResStatuses.UNAUTHORIZED) {
        dispatch(logoutUser());
      }

      dispatch(
        fetchTodosError(
          handleResponseError(error, ErrorsAlt.FAILED_FETCH_TODOS),
        ),
      );
    }
  };
};

export const createTodoThunk = (todoDraft: Omit<ITodo, 'id'>) => {
  return async (dispatch: Dispatch<TodoAction | AuthActions>) => {
    try {
      dispatch(createTodo());

      const newTodo = await fetchCreateTodo(todoDraft);

      dispatch(createTodoSuccess(newTodo));

      return true;
    } catch (error) {
      const resStatus = (error as AxiosError)?.response?.status;

      if (resStatus && resStatus === ApiResStatuses.UNAUTHORIZED) {
        dispatch(logoutUser());
      }

      dispatch(
        createTodoError(
          handleResponseError(error, ErrorsAlt.FAILED_CREATE_TODO),
        ),
      );

      return false;
    }
  };
};

export const updateTodoThunk = (todo: ITodo) => {
  return async (dispatch: Dispatch<TodoAction | AuthActions>) => {
    try {
      dispatch(updateTodo());

      const updatedTodo = await fetchUpdateTodo(todo);

      dispatch(updateTodoSuccess(updatedTodo));

      return true;
    } catch (error) {
      const resStatus = (error as AxiosError)?.response?.status;

      if (resStatus && resStatus === ApiResStatuses.UNAUTHORIZED) {
        dispatch(logoutUser());
      }

      dispatch(
        updateTodoError(
          handleResponseError(error, ErrorsAlt.FAILED_UPDATE_TODO),
        ),
      );

      return false;
    }
  };
};

export const deleteTodoThunk = (todoId: string) => {
  return async (dispatch: Dispatch<TodoAction | AuthActions>) => {
    try {
      dispatch(deleteTodo());

      await fetchDeleteTodo(todoId);

      if (todoId === ALL_COMPLETED) {
        dispatch(clearDoneTodo());
      } else {
        dispatch(deleteTodoSuccess(todoId));
      }

      return true;
    } catch (error) {
      const resStatus = (error as AxiosError)?.response?.status;

      if (resStatus && resStatus === ApiResStatuses.UNAUTHORIZED) {
        dispatch(logoutUser());
      }

      dispatch(
        deleteTodoError(
          handleResponseError(error, ErrorsAlt.FAILED_UPDATE_TODO),
        ),
      );

      return false;
    }
  };
};
