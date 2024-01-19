import { FC, useState } from 'react';

import { useActions, useAppSelector } from '@redux';
import { useDelayedResetError, useForm } from '@hooks';
import { ButtonSizes, ButtonVariants, IChangePassCredentials } from '@types';
import {
  CHANGE_PASS_FORM_INITIAL_VALUES as initialValues,
  CHANGE_PASS_FORM_INITIAL__ERRORS as initialErrors,
  CHANGE_PASS_FORM_VALIDATIONS as validations,
  CHANGE_PASS_INPUTS as inputs,
  ValidationsErrors,
  ResMessages,
} from '@constants';

import { CustomButton, CustomForm, CustomInput, Info } from '@components';

export const ChangePassForm: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const { changePasswordThunk, resetUserError } = useActions();

  const [successRes, setSuccessRes] = useState('');

  useDelayedResetError(resetUserError, error);
  useDelayedResetError(() => setSuccessRes(''), successRes);

  const {
    formValues,
    errors,

    handleInputChange,
    onResetForm,
  } = useForm(initialValues, initialErrors, validations);

  const isSamePass = formValues.newPassword === formValues.newPasswordConfirm;

  const isValidationError = !!Object.values(errors).find((error) => !!error);

  const passwordErrors =
    isValidationError || isSamePass ? '' : ValidationsErrors.PASSWORD_MISMATCH;

  const isValidForm = isLoading || !isSamePass || isValidationError;

  const handleReset = () => {
    onResetForm();
    resetUserError();
  };

  const handleChangePass = async () => {
    if (isValidForm) return;

    const credentials = formValues as unknown as IChangePassCredentials;

    const isSuccess = await changePasswordThunk(credentials);

    if (!isSuccess) return;

    setSuccessRes(ResMessages.PASS_CHANGED);
    handleReset();
  };

  if (successRes) {
    return <Info message={successRes} />;
  }

  return (
    <CustomForm
      formTitle="Change password"
      isLoading={isLoading}
      error={error || passwordErrors}
      onSubmit={handleChangePass}
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

          <CustomButton
            onClick={handleChangePass}
            isDisabled={isValidForm}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
          >
            Change password
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
