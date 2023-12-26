import { ITodo } from '@types';
import { ApiPaths } from '@constants';

import $api from './api';

export const fetchAllTodos = async () => {
  const { data } = await $api.get<ITodo[]>(ApiPaths.TODOS);

  return data;
};

export const fetchCreateTodo = async (todoDraft: Omit<ITodo, 'id'>) => {
  const { data } = await $api.post<ITodo>(ApiPaths.TODOS, todoDraft);

  return data;
};

export const fetchUpdateTodo = async ({ id, ...todo }: ITodo) => {
  const { data } = await $api.put<ITodo>(`${ApiPaths.TODOS}/${id}`, todo);

  return data;
};

export const fetchDeleteTodo = async (todoId: string) => {
  const { data } = await $api.delete<ITodo>(`${ApiPaths.TODOS}/${todoId}`);

  return data;
};
