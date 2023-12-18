import { createContext } from 'react';

import { Theme } from '@types';

interface ThemeProps {
  theme: Theme;
  onThemeChange: () => void;
}

export const ThemeContext = createContext<ThemeProps>({
  theme: Theme.LIGHT,
  onThemeChange: () => {},
});
