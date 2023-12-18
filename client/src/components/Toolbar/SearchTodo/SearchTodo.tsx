import { FC } from 'react';

import { useSearch } from '@hooks';

import { Search } from '@components';

export const SearchTodo: FC = () => {
  const { searchValue, onSearch } = useSearch();

  return (
    <Search
      value={searchValue}
      placeholder="Search task ..."
      onChange={onSearch}
    />
  );
};
