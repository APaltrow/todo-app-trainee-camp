import { useState } from 'react';

import { ValidationTypes, ValidationsErrors, ZERO_INDEX } from '@constants';
import { EMAIL_VALIDATOR } from '@helpers';
import { Validations } from '@types';

export const useValidations = (initialErrors: Record<string, string>) => {
  const [errors, setErrors] = useState(initialErrors);

  const validateInput = (
    name: string,
    value: string,
    validations: Validations,
  ) => {
    const errorsList: string[] = [];

    Object.entries(validations).forEach(([validationName, validationValue]) => {
      switch (validationName) {
        case ValidationTypes.EMPTY: {
          if (!value) {
            errorsList.push(ValidationsErrors.EMPTY_FIELD);
          }

          break;
        }

        case ValidationTypes.MIN_LENGTH: {
          const isLengthSmaller = value.length < +validationValue;

          if (isLengthSmaller) {
            errorsList.push(
              `${ValidationsErrors.MIN_LENGTH} ${validationValue}`,
            );
          }

          break;
        }

        case ValidationTypes.EMAIL: {
          const isInvalidEmail = !EMAIL_VALIDATOR.test(
            String(value).toLowerCase(),
          );

          if (isInvalidEmail) {
            errorsList.push(ValidationsErrors.INVALID_EMAIL);
          }

          break;
        }

        default: {
          break;
        }
      }
    });

    const inputError = errorsList.length
      ? errorsList[ZERO_INDEX]
      : ValidationsErrors.NO_ERROR;

    setErrors((prev) => ({ ...prev, [name]: inputError }));
  };

  const revalidate = (
    values: Record<string, string>,
    validations: Record<string, Validations>,
  ) => {
    Object.entries(values).forEach(([name, value]) => {
      const inputValidations = validations[name];

      validateInput(name, value, inputValidations);
    });
  };

  return {
    errors,

    validateInput,
    revalidate,
  };
};
