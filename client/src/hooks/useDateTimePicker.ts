import { ChangeEvent, useState } from 'react';

import { getLocalTimeFromISO } from '@helpers';
import { DATE_TIME_LENGTH } from '@constants';
import { ErrorMessages } from '@types';

export const useDateTimePicker = (
  timestamp: string,
  isReadonly: boolean,

  onChange?: (timestamp: string) => void,
) => {
  const initialDate = timestamp
    ? getLocalTimeFromISO(timestamp).slice(0, DATE_TIME_LENGTH)
    : '';

  const [pickerValue, setPickerValue] = useState(initialDate);
  const [pickerError, setPickerError] = useState('');

  const todayISOTimestamp = new Date().toISOString();
  const minDate = getLocalTimeFromISO(todayISOTimestamp).slice(
    0,
    DATE_TIME_LENGTH,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isReadonly) return;

    setPickerValue(e.target.value);
  };

  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    if (isReadonly) return;

    e.target.showPicker();
  };

  const handeBlur = () => {
    setPickerError('');

    if (!onChange || isReadonly) return;

    if (!pickerValue) {
      setPickerError(ErrorMessages.INCORRECT_DATE);
      return;
    }

    onChange(pickerValue);
  };

  return {
    pickerValue,
    minDate,
    pickerError,

    handeBlur,
    handleFocus,
    handleChange,
  };
};
