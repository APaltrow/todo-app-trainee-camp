import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { Theme } from '@types';
import { ThemeContext } from '@context';

interface ThemeProviderProps {
  children: ReactNode;
}

const PREFER_DARK_MEDIA = '(prefers-color-scheme: dark)';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const savedTheme = localStorage.getItem(Theme.KEY) as Theme;
  const isDarkPrefered = window.matchMedia(PREFER_DARK_MEDIA).matches;
  const preferedTheme = isDarkPrefered ? Theme.DARK : Theme.LIGHT;

  const [theme, setTheme] = useState<Theme>(savedTheme || preferedTheme);

  const onThemeChange = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );
  }, [theme]);

  const themeValue = useMemo(() => ({ theme, onThemeChange }), [theme]);

  useEffect(() => {
    localStorage.setItem(Theme.KEY, theme);
    document.documentElement.setAttribute('class', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={themeValue}
      {...props}
    >
      {children}
    </ThemeContext.Provider>
  );
};
