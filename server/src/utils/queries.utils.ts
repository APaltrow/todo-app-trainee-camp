import { COMPLETED_CATEGORY } from '@constants';
import { QueryParams } from '@interfaces';

export const getQueryParams = ({ search, category }: QueryParams) => {
  return {
    search: search || '',
    category: category || '',
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
