import { ChangeEvent, FC, useState } from 'react';

import { ButtonSizes, ButtonVariants, ILoginCredentials } from '@types';
import { useActions, useAppSelector } from '@redux';
import { useValidations } from '@hooks';
import { CustomButton, CustomInput, Loader, Error } from '@components';
import {
  LOGIN_FORM_INITIAL_VALUES,
  LOGIN_FORM_INITIAL__ERRORS,
  LOGIN_FORM_VALIDATIONS,
  LOGIN_INPUTS,
} from '@constants';

import style from './LoginForm.module.scss';

export const LoginForm: FC = () => {
  const { loginThunk } = useActions();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formValues, setFormValues] = useState<Record<string, string>>(
    LOGIN_FORM_INITIAL_VALUES,
  );

  const {
    errors,

    validateInput,
    revalidate,
  } = useValidations(LOGIN_FORM_INITIAL__ERRORS);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = value.trim();

    const inputValidations = LOGIN_FORM_VALIDATIONS[name];

    validateInput(name, inputValue, inputValidations);

    setFormValues((prev) => ({ ...prev, [name]: inputValue }));
  };

  const handleReset = () => {
    setFormValues(LOGIN_FORM_INITIAL_VALUES);

    revalidate(LOGIN_FORM_INITIAL_VALUES, LOGIN_FORM_VALIDATIONS);
  };

  const handleLogin = () => {
    const credentials = formValues as unknown as ILoginCredentials;
    loginThunk(credentials);
  };

  const isValidForm = !!Object.values(errors).find((error) => !!error);

  return (
    <div className={style.container}>
      <form
        className={style.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className={style.inputs}>
          <legend className={style.title}>Please sign in</legend>

          {isLoading && <Loader />}
          {!!error && <Error message={error} />}

          {LOGIN_INPUTS.map((input) => {
            const { name, placeholder, icon, type } = input;

            return (
              <CustomInput
                key={name}
                name={name}
                placeholder={placeholder}
                value={formValues[name]}
                error={errors[name]}
                type={type}
                icon={icon}
                onChange={handleInputChange}
              />
            );
          })}
        </fieldset>

        <div className={style.btns}>
          <CustomButton
            onClick={handleReset}
            variant={ButtonVariants.SECONDARY}
            size={ButtonSizes.MID}
            isLoading={isLoading}
            withLoader
          >
            Reset
          </CustomButton>

          <CustomButton
            onClick={handleLogin}
            isDisabled={isValidForm}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
            isLoading={isLoading}
            withLoader
          >
            Login
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
