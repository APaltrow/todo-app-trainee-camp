import { FC } from 'react';

import { useAppSelector } from '@redux';
import { useAlert, useFilter } from '@hooks';
import { FILTER_OPTIONS } from '@constants';
import { AlertMessages, ButtonVariants } from '@types';
import { Alert, CustomButton, Tooltip } from '@components';

import style from './FilterTodo.module.scss';

export const FilterTodo: FC = () => {
  const { isLoading, totals: todoTotals } = useAppSelector(
    (state) => state.todo,
  );

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
                  <span className={style.btn}>{option}</span>
                </CustomButton>
              </Tooltip>
            </li>
          );
        })}
      </ul>

      <CustomButton
        variant={ButtonVariants.SECONDARY}
        onClick={handleClearCompleted}
        isDisabled={isLoading || !todoTotals.completed}
      >
        Clear completed
      </CustomButton>

      {!!alert && (
        <Alert
          text={alert.text}
          onCancel={onAlertCancel}
          onConfirm={alert.onConfirm}
        />
      )}
    </div>
  );
};
