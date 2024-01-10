import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { useTheme } from '@hooks';
import { RoutesPaths } from '@constants';
import { ButtonSizes, ButtonVariants, IconsTypes, Theme } from '@types';
import { CustomButton, Icon } from '@components';

import style from './Header.module.scss';

export const Header: FC = () => {
  const { isAuth, isLogoutLoading } = useAppSelector((state) => state.auth);

  const { logoutThunk } = useActions();
  const { theme, onThemeChange } = useTheme();

  const iconName = theme === Theme.LIGHT ? IconsTypes.MOON : IconsTypes.SUN;

  const handleLogout = () => logoutThunk();

  return (
    <header className={style.header}>
      <NavLink to={RoutesPaths.MAIN}>
        <h3 className={style.title}>
          Just <span className={style.logo}>TODO</span> it
        </h3>
      </NavLink>

      <div className={style.btns}>
        {isAuth && (
          <>
            <CustomButton
              withLoader
              isLoading={isLogoutLoading}
              onClick={handleLogout}
              size={ButtonSizes.SMALL}
              variant={ButtonVariants.PRIMARY}
            >
              Logout
            </CustomButton>

            <NavLink to={RoutesPaths.PROFILE}>
              <CustomButton
                onClick={() => {}}
                size={ButtonSizes.SMALL}
              >
                <Icon iconName={IconsTypes.PROFILE} />
              </CustomButton>
            </NavLink>
          </>
        )}

        <CustomButton
          onClick={onThemeChange}
          size={ButtonSizes.SMALL}
        >
          <Icon iconName={iconName} />
        </CustomButton>
      </div>
    </header>
  );
};
