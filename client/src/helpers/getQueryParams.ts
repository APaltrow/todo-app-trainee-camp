import { FilterOptions } from '@types';

interface IQueryParams {
  search: string;
  category: FilterOptions;
}

export const getQueryParams = ({ search, category }: IQueryParams) => {
  let query = {};

  if (search) {
    query = { ...query, search };
  }

  if (category !== FilterOptions.ALL) {
    query = { ...query, category };
  }

  const queryString = new URLSearchParams(query).toString();

  if (!queryString.length) return '';

  return `?${queryString}`;
};
