import { ChangeEvent, useState } from 'react';

import { useDebounce } from '@hooks';
import { useActions } from '@redux';

const DELAY = 300;

export const useSearch = () => {
  const { setSearchTodo } = useActions();

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(
    (searchText: string) => setSearchTodo(searchText),
    DELAY,
  );

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    setSearchValue(searchText);
    debouncedSearch(searchText.trim());
  };

  return { searchValue, onSearch };
};
