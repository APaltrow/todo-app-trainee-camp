import { ChangeEvent, FC, useId } from 'react';

import { Icon } from '@components';
import { IconsTypes } from '@types';

import style from './PhotoUploader.module.scss';

interface PhotoUploaderProps {
  name: string;
  isLoading: boolean;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoUploader: FC<PhotoUploaderProps> = ({
  name,
  isLoading,
  onChange,
}) => {
  const id = useId();

  const icon = !isLoading ? IconsTypes.CAMERA : IconsTypes.SPINNER;

  return (
    <div className={style.container}>
      <label
        htmlFor={id}
        className={`${style.label} ${isLoading ? style.loading : ''}`}
      >
        <Icon iconName={icon} />
      </label>
      <input
        className={style.input}
        type="file"
        id={id}
        name={name}
        readOnly={isLoading}
        accept=".jpeg, .png, .jpg"
        onChange={onChange}
      />
    </div>
  );
};
