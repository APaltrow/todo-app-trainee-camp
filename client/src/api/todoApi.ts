import { ITodo } from '@types';
import { ApiPaths } from '@constants';

import $api from './api';

export const fetchAllTodos = async (params: string) => {
  const { data } = await $api.get<ITodo[]>(`${ApiPaths.TODOS}${params}`);

  return data;
};

export const fetchCreateTodo = async (todoDraft: Omit<ITodo, 'id'>) => {
  const { data } = await $api.post<ITodo>(ApiPaths.TODOS, todoDraft);

  return data;
};

export const fetchUpdateTodo = async (todo: ITodo) => {
  const { data } = await $api.put<ITodo>(ApiPaths.TODOS, todo);

  return data;
};

export const fetchDeleteTodo = async (todoId: string) => {
  const { data } = await $api.delete<ITodo>(`${ApiPaths.TODOS}/${todoId}`);

  return data;
};
