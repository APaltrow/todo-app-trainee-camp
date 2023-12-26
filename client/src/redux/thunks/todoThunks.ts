import { Dispatch } from 'react';
import { AxiosError } from 'axios';

import { fetchAllTodos, fetchCreateTodo } from '@api';
import { ApiResStatuses } from '@constants';
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
