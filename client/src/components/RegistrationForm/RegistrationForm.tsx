import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import {
  REGISTRATION_FORM_INITIAL_VALUES as initialValues,
  REGISTRATION_FORM_INITIAL__ERRORS as initialErrors,
  REGISTRATION_FORM_VALIDATIONS as validations,
  REGISTRATION_INPUTS as inputs,
  ValidationsErrors,
  RoutesPaths,
} from '@constants';
import { ButtonSizes, ButtonVariants, IRegistrationCredentials } from '@types';
import { useDelayedResetError, useForm } from '@hooks';

import { CustomButton, CustomForm, CustomInput } from '@components';

export const RegistrationForm: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const { registerThunk, resetUserError } = useActions();

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

  const handleRegistration = () => {
    const credentials = formValues as unknown as IRegistrationCredentials;
    registerThunk(credentials);
  };

  const isSamePass = formValues.password === formValues.passwordConfirm;

  const isValidationError = !!Object.values(errors).find((error) => !!error);

  const passwordErrors =
    isValidationError || isSamePass ? '' : ValidationsErrors.PASSWORD_MISMATCH;

  const isValidForm = isLoading || !isSamePass || isValidationError;

  return (
    <CustomForm
      formTitle="Registration"
      isLoading={isLoading}
      error={error || passwordErrors}
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

          <NavLink to={`../${RoutesPaths.LOGIN}`}>Login</NavLink>

          <CustomButton
            onClick={handleRegistration}
            isDisabled={isValidForm}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
          >
            Register
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
