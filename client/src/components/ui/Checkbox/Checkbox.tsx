import { FC, useId } from 'react';

import style from './Checkbox.module.scss';

interface CheckboxProps {
  isChecked: boolean;
  isDisabled?: boolean;

  onChange: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  isDisabled = false,

  onChange,
}) => {
  const inputId = useId();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    onChange();
  };

  return (
    <div className={`${style.container} ${isDisabled ? style.disabled : ''}`}>
      <input
        className={style.input}
        type="checkbox"
        id={inputId}
        onChange={onChange}
        onKeyUp={handleKeyPress}
        checked={isChecked}
        disabled={isDisabled}
      />
      <label
        className={style.label}
        htmlFor={inputId}
      />
    </div>
  );
};
