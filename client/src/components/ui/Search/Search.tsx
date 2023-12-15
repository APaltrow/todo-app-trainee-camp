import { ChangeEvent, FC } from 'react';

import { IconsTypes } from '@types';
import { Icon } from '@components';

import style from './Search.module.scss';

interface SearchProps {
  value: string;
  placeholder: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Search: FC<SearchProps> = ({ value, placeholder, onChange }) => {
  return (
    <div className={style.container}>
      <input
        className={style.input}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
      />

      <span className={style.icon}>
        <Icon iconName={IconsTypes.SEARCH} />
      </span>
    </div>
  );
};
