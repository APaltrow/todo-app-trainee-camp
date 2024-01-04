import { ChangeEvent, useState } from 'react';

import { Validations } from '@types';
import { useValidations } from '@hooks';

export const useForm = (
  initialValues: Record<string, string>,
  initialErrors: Record<string, string>,
  validations: Record<string, Validations>,
) => {
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

  const onResetForm = () => {
    setFormValues(initialValues);

    revalidate(initialValues, validations);
  };

  return {
    formValues,
    errors,

    handleInputChange,
    onResetForm,
  };
};
