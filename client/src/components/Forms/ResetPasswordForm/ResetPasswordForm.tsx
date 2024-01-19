import { FC, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { CustomButton, CustomForm, CustomInput, Info } from '@components';
import { useDebounce, useDelayedResetError, useForm } from '@hooks';
import { useActions, useAppSelector } from '@redux';
import { ButtonSizes, ButtonVariants, IResetPasswordCredentials } from '@types';
import {
  RESET_PASS_FORM_INITIAL_VALUES as initialValues,
  RESET_PASS_FORM_INITIAL_ERRORS as initialErrors,
  RESET_PASS_FORM_VALIDATIONS as validations,
  RESET_PASS_INPUTS as inputs,
  RoutesPaths,
  ResMessages,
  SUCCESS_MSG_DELAY,
  ValidationsErrors,
} from '@constants';

export const ResetPasswordForm: FC = () => {
  const { isLoading, resetPasswordError: error } = useAppSelector(
    (state) => state.auth,
  );

  const { resetUserError, resetPasswordThunk } = useActions();

  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();

  const { id: resetLink } = useParams();

  useDelayedResetError(resetUserError, error);

  const {
    formValues,
    errors,

    handleInputChange,
    onResetForm,
  } = useForm(initialValues, initialErrors, validations);

  const { newPassword, newPasswordConfirm } = formValues;
  const isSamePass =
    newPassword === newPasswordConfirm
      ? ''
      : ValidationsErrors.PASSWORD_MISMATCH;

  const isValidationError =
    !!Object.values(errors).find((error) => !!error) || !!isSamePass;

  const isValidForm = isLoading || isValidationError;

  const redirectToLogin = useDebounce(
    () => navigate(`../${RoutesPaths.LOGIN}`),
    SUCCESS_MSG_DELAY,
  );

  const handleReceiveResetLink = async () => {
    if (isValidForm || !resetLink) return;

    const isSuccess = await resetPasswordThunk({
      ...formValues,
      resetLink,
    } as IResetPasswordCredentials);

    if (!isSuccess) return;

    onResetForm();
    setResetMessage(ResMessages.RESET_PASS_SUCCESS);
    redirectToLogin();
  };

  const handleReset = () => {
    onResetForm();
    resetUserError();
  };

  if (resetMessage) {
    return <Info message={resetMessage} />;
  }

  return (
    <CustomForm
      formTitle="Reset password"
      isLoading={isLoading}
      error={error || isSamePass}
      onSubmit={handleReceiveResetLink}
      buttons={
        <>
          <CustomButton
            onClick={handleReset}
            variant={ButtonVariants.SECONDARY}
            size={ButtonSizes.MID}
          >
            Reset
          </CustomButton>

          <NavLink to={`../${RoutesPaths.LOGIN}`}>
            <CustomButton
              onClick={() => {}}
              variant={ButtonVariants.DEFAULT}
              size={ButtonSizes.MID}
              isDisabled={isLoading}
            >
              Login
            </CustomButton>
          </NavLink>

          <CustomButton
            onClick={handleReceiveResetLink}
            isDisabled={isValidForm}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
          >
            Confirm
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
