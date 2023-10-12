import { FC } from 'react';

import { IconsTypes } from '@types';

import { DATE_PICKER_MAX_VALUE } from '@constants';
import { useDateTimePicker } from '@hooks';

import { Icon } from '@components';

import style from './DateTimePicker.module.scss';

interface DateTimePickerProps {
  title: string;
  value: string;
  error?: string;
  isReadonly?: boolean;

  onChange?: (timestamp: string) => void;
}

export const DateTimePicker: FC<DateTimePickerProps> = ({
  value,
  title,
  error = '',
  isReadonly = false,

  onChange,
}) => {
  const {
    minDate,
    pickerValue,
    pickerError,

    handeBlur,
    handleFocus,
    handleChange,
  } = useDateTimePicker(value, isReadonly, onChange);

  const errorMessage = error || pickerError;

  return (
    <div className={style.container}>
      <label
        htmlFor={title}
        className={style.title}
      >
        {title}
      </label>
      <input
        value={pickerValue}
        min={minDate}
        max={DATE_PICKER_MAX_VALUE}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handeBlur}
        id={title}
        type="datetime-local"
        readOnly={isReadonly}
        tabIndex={isReadonly ? -1 : 0}
        className={style.input}
      />

      <span className={style.icon}>
        <Icon
          iconName={isReadonly ? IconsTypes.DATE_START : IconsTypes.DATE_END}
        />
      </span>

      {errorMessage ? (
        <span className={style.error}>{errorMessage}</span>
      ) : null}
    </div>
  );
};
