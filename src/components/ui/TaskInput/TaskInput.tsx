import { ChangeEvent, FC } from 'react';

import style from './TaskInput.module.scss';

interface TaskInputProps {
  value: string;
  error: string;
  placeholder: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TaskInput: FC<TaskInputProps> = ({
  value,
  error,
  placeholder,

  onChange,
  onKeyUp,
}) => {
  return (
    <div className={style.container}>
      <input
        className={style.input}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        type="text"
        placeholder={placeholder}
      />

      {error ? <span className={style.error}>{error}</span> : null}
    </div>
  );
};
