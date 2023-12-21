import { FC } from 'react';

import { useAlert, useFilter, useTodoTotals } from '@hooks';
import { FILTER_OPTIONS } from '@constants';
import { AlertMessages, ButtonVariants } from '@types';
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
      text: AlertMessages.CLEAR_COMPLETED,
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
                  variant={
                    isSelected ? ButtonVariants.DEFAULT : ButtonVariants.PRIMARY
                  }
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
        variant={ButtonVariants.SECONDARY}
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