import { useState } from 'react';

import { IAlert } from '@types';

export const useAlert = () => {
  const [alert, setAlert] = useState<IAlert | null>(null);

  const onAlertCall = (alertObj: IAlert) => {
    setAlert(alertObj);
  };

  const onAlertCancel = () => {
    setAlert(null);
  };

  return { alert, onAlertCall, onAlertCancel };
};
