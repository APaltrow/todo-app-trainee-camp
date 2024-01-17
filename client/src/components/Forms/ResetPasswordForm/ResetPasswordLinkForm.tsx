import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { CustomButton, CustomForm, CustomInput } from '@components';
import { useDelayedResetError, useForm } from '@hooks';
import { useActions, useAppSelector } from '@redux';
import { ButtonSizes, ButtonVariants } from '@types';
import {
  RESET_LINK_FORM_INITIAL_VALUES as initialValues,
  RESET_LINK_FORM_INITIAL_ERRORS as initialErrors,
  RESET_LINK_FORM_VALIDATIONS as validations,
  RESET_LINK_INPUTS as inputs,
  ResMessages,
} from '@constants';

export const ResetPasswordLinkForm: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const { resetUserError, getResetPasswordLinkThunk } = useActions();

  const [resetMessage, setResetMessage] = useState('');

  useDelayedResetError(resetUserError, error);

  const {
    formValues,
    errors,

    handleInputChange,
    onResetForm,
  } = useForm(initialValues, initialErrors, validations);

  const isValidForm =
    isLoading || !!Object.values(errors).find((error) => !!error);

  const handleReceiveResetLink = async () => {
    if (isValidForm) return;

    const { email } = formValues;
    const isSuccess = await getResetPasswordLinkThunk(email);

    if (!isSuccess) return;

    setResetMessage(ResMessages.RESET_LINK_SUCCESS);
    onResetForm();
  };

  if (resetMessage) {
    return <h3>{resetMessage}</h3>;
  }

  return (
    <CustomForm
      formTitle="Reset password link"
      isLoading={isLoading}
      error={error}
      onSubmit={handleReceiveResetLink}
      buttons={
        <>
          <NavLink to="../">
            <CustomButton
              onClick={() => {}}
              variant={ButtonVariants.DEFAULT}
              size={ButtonSizes.MID}
            >
              Go back
            </CustomButton>
          </NavLink>

          <CustomButton
            onClick={handleReceiveResetLink}
            isDisabled={isValidForm}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
          >
            Send reset link
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
