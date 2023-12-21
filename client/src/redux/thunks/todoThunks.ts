import { Dispatch } from 'react';
import { AxiosError } from 'axios';

import { fetchAllTodos } from '@api';
import { ApiResStatuses } from '@constants';
import { handleResponseError } from '@helpers';
import { AuthActions, ErrorsAlt, TodoAction } from '@types';

import {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosError,
  logoutUser,
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
