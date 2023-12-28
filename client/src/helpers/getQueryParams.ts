interface IQueryParams {
  search: string;
}

export const getQueryParams = ({ search }: IQueryParams) => {
  let query = {};

  if (search) {
    query = { ...query, search };
  }

  const queryString = new URLSearchParams(query).toString();

  if (!queryString.length) return '';

  return `?${queryString}`;
};
