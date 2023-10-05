import { useCallback, useRef } from 'react';

export const useDebounce = (callback: (args: any) => void, delay: number) => {
  const timer = useRef<null | NodeJS.Timer>(null);

  const debounced = useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debounced;
};
