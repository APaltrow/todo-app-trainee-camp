import { ChangeEvent, FC, useState } from 'react';

import { IconsTypes } from '@types';
import { Icon, Error } from '@components';

import style from './CustomInput.module.scss';

interface CustomInputProps {
  placeholder: string;
  name: string;
  value: string;
  error: string;
  icon?: IconsTypes;
  type?: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  name,
  value,
  error = '',
  type = 'text',
  icon,

  onChange,
}) => {
  const [isTouched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        autoComplete="off"
        type={type}
      />

      {!!icon && (
        <span className={style.icon}>
          <Icon iconName={icon} />
        </span>
      )}

      {!!error && isTouched && <Error message={error} />}
    </div>
  );
};
