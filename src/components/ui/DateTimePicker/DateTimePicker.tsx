import { FC, ChangeEvent } from 'react';

import { formatISOTime } from '@helpers';

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
  const date = value ? formatISOTime(value).slice(0, 16) : '';
  const minDate = formatISOTime(new Date().toISOString()).slice(0, 16);

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
      {error ? <span className={style.error}>{error}</span> : null}
    </div>
  );
};
