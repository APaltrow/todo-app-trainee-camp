import { FC, ReactNode } from 'react';

import { Loader, Error } from '@components';

import style from './CustomForm.module.scss';

interface CustomFormProps {
  formTitle: string;
  isLoading: boolean;
  error: string;
  children: ReactNode;
  buttons: JSX.Element;
}

export const CustomForm: FC<CustomFormProps> = ({
  formTitle,
  isLoading,
  error,
  children,
  buttons,
}) => {
  return (
    <div className={style.container}>
      <form
        className={style.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className={style.inputs}>
          <legend className={style.title}>{formTitle}</legend>

          {isLoading && <Loader />}
          {!!error && <Error message={error} />}

          {children}
        </fieldset>

        <div className={style.btns}>{buttons}</div>
      </form>
    </div>
  );
};
