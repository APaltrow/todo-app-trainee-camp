import { FC } from 'react';

import { useFilter, useTodoTotals } from '@hooks';
import { FILTER_OPTIONS } from '@constants';

import { CustomButton, Tooltip } from '@components';

import style from './FilterTodo.module.scss';

export const FilterTodo: FC = () => {
  const todoTotals = useTodoTotals();
  const {
    filterValue,

    onSetFilter,
    onClearDoneTodos,
  } = useFilter();

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {FILTER_OPTIONS.map((option) => {
          const isSelected = filterValue === option;

          return (
            <li
              key={`filter_btn_${option}`}
              className={isSelected ? style.filter_item_active : ''}
            >
              <Tooltip value={isSelected ? null : todoTotals[option]}>
                <CustomButton
                  variant={isSelected ? 'default' : 'primary'}
                  onClick={() => onSetFilter(option)}
                  isDisabled={isSelected}
                >
                  {option}
                </CustomButton>
              </Tooltip>
            </li>
          );
        })}
      </ul>

      <CustomButton
        variant="secondary"
        onClick={onClearDoneTodos}
        isDisabled={!todoTotals.Completed}
      >
        Clear completed
      </CustomButton>
    </div>
  );
};
