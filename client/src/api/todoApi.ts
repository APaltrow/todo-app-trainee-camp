import { ITodo } from '@types';
import { ApiPaths } from '@constants';

import $api from './api';

export const fetchAllTodos = async () => {
  const { data } = await $api.get<ITodo[]>(ApiPaths.TODOS);

  return data;
};
