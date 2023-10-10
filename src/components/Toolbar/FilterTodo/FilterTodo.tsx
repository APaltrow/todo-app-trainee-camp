import { FC } from 'react';

import { useAlert, useFilter, useTodoTotals } from '@hooks';
import { FILTER_OPTIONS } from '@constants';

import { Alert, CustomButton, Tooltip } from '@components';

import style from './FilterTodo.module.scss';

export const FilterTodo: FC = () => {
  const todoTotals = useTodoTotals();

  const { alert, onAlertCall, onAlertCancel } = useAlert();

  const {
    filterValue,

    onSetFilter,
    onClearDoneTodos,
  } = useFilter();

  const handleClearCompleted = () => {
    onAlertCall({
      text: 'Would you like to clear all completed tasks?',
      onConfirm: () => {
        onClearDoneTodos();
        onAlertCancel();
      },
    });
  };

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
        onClick={handleClearCompleted}
        isDisabled={!todoTotals.Completed}
      >
        Clear completed
      </CustomButton>

      {alert ? (
        <Alert
          text={alert.text}
          onCancel={onAlertCancel}
          onConfirm={alert.onConfirm}
        />
      ) : null}
    </div>
  );
};
