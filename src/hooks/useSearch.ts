import { ChangeEvent, useState } from 'react';

import { useDebounce } from '@hooks';
import { useActions, useAppSelector } from '@redux';

const DELAY = 300;

export const useSearch = () => {
  const { searchValue: initialSearchValue } = useAppSelector(
    (state) => state.todo,
  );
  const { setSearchTodo } = useActions();

  const [searchValue, setSearchValue] = useState(initialSearchValue);

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
