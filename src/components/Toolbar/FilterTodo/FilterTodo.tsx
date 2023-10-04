import { FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { FilterOptions } from '@types';

import { CustomButton } from '@components';

import style from './FilterTodo.module.scss';

const FILTER_BUTTONS = ['All', 'Active', 'Completed'];

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
      {FILTER_BUTTONS.map((button) => (
        <li
          key={`filter_btn_${button}`}
          className={filterValue === button ? style.filter_item_active : ''}
        >
          <CustomButton
            variant={filterValue === button ? 'default' : 'primary'}
            onClick={() => handleSetFilter(button as FilterOptions)}
            isDisabled={filterValue === button}
          >
            {button}
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
