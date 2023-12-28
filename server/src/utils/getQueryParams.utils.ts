import { QueryParams } from '@interfaces';

export const getQueryParams = (query: QueryParams) => {
  const search = (query.search as string) || '';

  return {
    search,
  };
};
