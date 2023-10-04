import { FC } from 'react';

import { FilterOptions } from '@types';
import { useFilter } from '@hooks';
import { FILTER_OPTIONS } from '@constants';

import { CustomButton } from '@components';

import style from './FilterTodo.module.scss';

export const FilterTodo: FC = () => {
  const {
    filterValue,
    isAnyTodoDone,

    onSetFilter,
    onClearDoneTodos,
  } = useFilter();

  return (
    <ul className={style.container}>
      {FILTER_OPTIONS.map((option) => (
        <li
          key={`filter_btn_${option}`}
          className={filterValue === option ? style.filter_item_active : ''}
        >
          <CustomButton
            variant={filterValue === option ? 'default' : 'primary'}
            onClick={() => onSetFilter(option as FilterOptions)}
            isDisabled={filterValue === option}
          >
            {option}
          </CustomButton>
        </li>
      ))}

      <li>
        <CustomButton
          variant="secondary"
          onClick={onClearDoneTodos}
          isDisabled={!isAnyTodoDone}
        >
          Clear completed
        </CustomButton>
      </li>
    </ul>
  );
};
