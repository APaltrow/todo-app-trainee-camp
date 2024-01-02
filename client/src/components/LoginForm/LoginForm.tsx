import { ChangeEvent, FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ButtonSizes, ButtonVariants, ILoginCredentials } from '@types';
import { useActions, useAppSelector } from '@redux';
import { useDelayedResetError, useValidations } from '@hooks';
import { CustomButton, CustomInput, CustomForm } from '@components';
import {
  LOGIN_FORM_INITIAL_VALUES as initialValues,
  LOGIN_FORM_INITIAL__ERRORS as initialErrors,
  LOGIN_FORM_VALIDATIONS as validations,
  LOGIN_INPUTS as inputs,
  RoutesPaths,
} from '@constants';

export const LoginForm: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const { loginThunk, resetUserError } = useActions();

  useDelayedResetError(resetUserError, error);

  const [formValues, setFormValues] =
    useState<Record<string, string>>(initialValues);

  const {
    errors,

    validateInput,
    revalidate,
  } = useValidations(initialErrors);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = value.trim();

    const inputValidations = validations[name];

    validateInput(name, inputValue, inputValidations);

    setFormValues((prev) => ({ ...prev, [name]: inputValue }));
  };

  const handleReset = () => {
    setFormValues(initialValues);

    revalidate(initialValues, validations);
    resetUserError();
  };

  const handleLogin = () => {
    const credentials = formValues as unknown as ILoginCredentials;
    loginThunk(credentials);
  };

  const isValidForm =
    isLoading || !!Object.values(errors).find((error) => !!error);

  return (
    <CustomForm
      formTitle="Please sign in"
      isLoading={isLoading}
      error={error}
      buttons={
        <>
          <CustomButton
            onClick={handleReset}
            variant={ButtonVariants.SECONDARY}
            size={ButtonSizes.MID}
            isDisabled={isLoading}
          >
            Reset
          </CustomButton>

          <NavLink to={`../${RoutesPaths.REGISTRATION}`}>Registration</NavLink>

          <CustomButton
            onClick={handleLogin}
            isDisabled={isValidForm}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
          >
            Login
          </CustomButton>
        </>
      }
    >
      {inputs.map((input) => {
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
    </CustomForm>
  );
};
