import { COMPLETED_CATEGORY } from '@constants';
import { QueryParams } from '@interfaces';

export const getQueryParams = (query: QueryParams) => {
  const search = (query.search as string) || '';
  const category = (query.category as string) || '';

  return {
    search,
    category,
  };
};

export const getTodoFilterQuery = ({ search, category }: QueryParams) => {
  const withCategory = category
    ? { isDone: category.toLowerCase() === COMPLETED_CATEGORY }
    : {};

  return {
    text: {
      $regex: search,
      $options: 'i',
    },
    $and: [withCategory],
  };
};
