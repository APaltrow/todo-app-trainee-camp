import { useDebounce } from '@hooks';
import { useEffect } from 'react';

const DEFAULT_ERROR_TIMEOUT = 5000;

export const useDelayedResetError = (
  resetError: () => void,
  error: string,
  delay: number = DEFAULT_ERROR_TIMEOUT,
) => {
  const debouncedReset = useDebounce(() => resetError(), delay);

  useEffect(() => {
    if (error) {
      debouncedReset();
    }
  }, [error]);
};
