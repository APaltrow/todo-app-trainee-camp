import { FC } from 'react';

import style from './Checkbox.module.scss';

interface CheckboxProps {
  id: number;
  isChecked: boolean;

  onChange: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({ id, isChecked, onChange }) => {
  const inputId = String(id);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    onChange();
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        type="checkbox"
        id={inputId}
        onChange={onChange}
        onKeyUp={handleKeyPress}
        checked={isChecked}
      />
      <label
        className={style.label}
        htmlFor={inputId}
      />
    </div>
  );
};
