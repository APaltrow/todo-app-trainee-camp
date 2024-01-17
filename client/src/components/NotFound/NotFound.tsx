import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { CustomButton } from '@components';
import { ButtonSizes, ButtonVariants } from '@types';
import { RoutesPaths } from '@constants';

import style from './NotFound.module.scss';

export const NotFound: FC = () => {
  return (
    <article className={style.container}>
      <h3>Oops, such page is not found ...</h3>
      <p>Looks like the page is unavailable or does not exist.</p>

      <NavLink to={RoutesPaths.MAIN}>
        <CustomButton
          size={ButtonSizes.MID}
          variant={ButtonVariants.PRIMARY}
          onClick={() => {}}
        >
          Go home
        </CustomButton>
      </NavLink>
    </article>
  );
};
