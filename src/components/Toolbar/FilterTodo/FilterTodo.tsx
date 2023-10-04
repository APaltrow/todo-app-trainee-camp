import { FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { FilterOptions } from '@types';

import { CustomButton } from '@components';

import style from './FilterTodo.module.scss';

const FILTER_OPTIONS = ['All', 'Active', 'Completed'];

export const FilterTodo: FC = () => {
  const { filterValue, todoList } = useAppSelector((state) => state.todo);

  const { clearDoneTodo, setFilterTodo } = useActions();

  const handleClearDoneTodo = () => {
    const isConfirmed = window.confirm(
      'Would you like to clear completed tasks?',
    );

    if (!isConfirmed) return;

    clearDoneTodo();
  };
  const handleSetFilter = (filter: FilterOptions) => setFilterTodo(filter);

  const isAnyTodoDone = !!todoList.find((todo) => todo.isDone);

  return (
    <ul className={style.container}>
      {FILTER_OPTIONS.map((option) => (
        <li
          key={`filter_btn_${option}`}
          className={filterValue === option ? style.filter_item_active : ''}
        >
          <CustomButton
            variant={filterValue === option ? 'default' : 'primary'}
            onClick={() => handleSetFilter(option as FilterOptions)}
            isDisabled={filterValue === option}
          >
            {option}
          </CustomButton>
        </li>
      ))}

      <li>
        <CustomButton
          variant="secondary"
          onClick={handleClearDoneTodo}
          isDisabled={!isAnyTodoDone}
        >
          Clear completed
        </CustomButton>
      </li>
    </ul>
  );
};
