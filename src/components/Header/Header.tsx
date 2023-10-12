import { FC } from 'react';

import { useTheme } from '@hooks';
import { ButtonSizes, IconsTypes, Theme } from '@types';
import { CustomButton, Icon } from '@components';

import style from './Header.module.scss';

export const Header: FC = () => {
  const { theme, onThemeChange } = useTheme();

  return (
    <header className={style.header}>
      <h3>
        Just <span className={style.logo}>TODO</span> it
      </h3>

      <CustomButton
        onClick={onThemeChange}
        size={ButtonSizes.SMALL}
      >
        {theme === Theme.LIGHT ? (
          <Icon iconName={IconsTypes.MOON} />
        ) : (
          <Icon iconName={IconsTypes.SUN} />
        )}
      </CustomButton>
    </header>
  );
};
