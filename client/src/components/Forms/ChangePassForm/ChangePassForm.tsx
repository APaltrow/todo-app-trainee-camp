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

import { CustomButton, CustomForm, CustomInput } from '@components';

import style from './ChangePassForm.module.scss';

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

  const handleReset = () => {
    onResetForm();
    resetUserError();
  };

  const handleRegistration = async () => {
    const credentials = formValues as unknown as IChangePassCredentials;

    const isSuccess = await changePasswordThunk(credentials);

    if (!isSuccess) return;

    setSuccessRes(ResMessages.PASS_CHANGED);
    handleReset();
  };

  const isSamePass = formValues.newPassword === formValues.newPasswordConfirm;

  const isValidationError = !!Object.values(errors).find((error) => !!error);

  const passwordErrors =
    isValidationError || isSamePass ? '' : ValidationsErrors.PASSWORD_MISMATCH;

  const isValidForm = isLoading || !isSamePass || isValidationError;

  if (successRes) {
    return <h3 className={style.success_msg}>{successRes}</h3>;
  }

  return (
    <CustomForm
      formTitle="Change password"
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

          <CustomButton
            onClick={handleRegistration}
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
