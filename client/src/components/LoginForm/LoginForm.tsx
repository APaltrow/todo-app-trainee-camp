import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ButtonSizes, ButtonVariants, ILoginCredentials } from '@types';
import { useActions, useAppSelector } from '@redux';
import { useDelayedResetError, useForm } from '@hooks';
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

  const {
    formValues,
    errors,

    handleInputChange,
    onResetForm,
  } = useForm(initialValues, initialErrors, validations);

  const handleReset = () => {
    onResetForm();
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
      onSubmit={handleLogin}
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

          <NavLink to={`../${RoutesPaths.REGISTRATION}`}>
            <CustomButton
              onClick={() => {}}
              variant={ButtonVariants.DEFAULT}
              size={ButtonSizes.MID}
              isDisabled={isLoading}
            >
              Registration
            </CustomButton>
          </NavLink>

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
