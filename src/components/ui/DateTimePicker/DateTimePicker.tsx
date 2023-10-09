import { FC, ChangeEvent } from 'react';

import { IconsTypes } from '@types';
import { getLocalTimeFromISO } from '@helpers';
import { DATE_TIME_LENGTH } from '@constants';

import { Icon } from '@components';

import style from './DateTimePicker.module.scss';

interface DateTimePickerProps {
  title: string;
  value: string;
  error?: string;
  isReadonly?: boolean;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DateTimePicker: FC<DateTimePickerProps> = ({
  value,
  title,
  error = '',
  isReadonly = false,

  onChange,
}) => {
  const date = value
    ? getLocalTimeFromISO(value).slice(0, DATE_TIME_LENGTH)
    : '';
  const todayISOTimestamp = new Date().toISOString();
  const minDate = getLocalTimeFromISO(todayISOTimestamp).slice(
    0,
    DATE_TIME_LENGTH,
  );

  return (
    <div className={style.container}>
      <label
        htmlFor={title}
        className={style.title}
      >
        {title}
      </label>
      <input
        value={date}
        min={minDate}
        onChange={onChange}
        id={title}
        type="datetime-local"
        readOnly={isReadonly}
        className={style.input}
      />

      <span className={style.icon}>
        <Icon
          iconName={isReadonly ? IconsTypes.DATE_START : IconsTypes.DATE_END}
        />
      </span>

      {error ? <span className={style.error}>{error}</span> : null}
    </div>
  );
};
