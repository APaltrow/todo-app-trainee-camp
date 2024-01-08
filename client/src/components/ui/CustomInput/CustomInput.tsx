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
  const [isShowPass, setShowPass] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleShowPass = () => setShowPass((prev) => !prev);

  const showPassIcon = isShowPass ? IconsTypes.EYE_OFF : IconsTypes.EYE_ON;
  const inputType = isShowPass && value ? 'text' : type;

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
        type={inputType}
      />

      {!!icon && (
        <span className={style.icon}>
          <Icon iconName={icon} />
        </span>
      )}

      {!!error && isTouched && <Error message={error} />}

      {type === 'password' && value && (
        <button
          className={style.icon_pass}
          onClick={handleShowPass}
        >
          <Icon iconName={showPassIcon} />
        </button>
      )}
    </div>
  );
};
