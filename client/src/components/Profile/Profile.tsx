import { FC } from 'react';

import { useAppSelector } from '@redux';
import { ChangePassForm } from '@components';

import style from './Profile.module.scss';

export const Profile: FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const { email, firstName, lastName } = user;

  return (
    <section className={style.container}>
      <article className={style.user_info}>
        <h2 className={style.name}>{`${firstName} ${lastName}`}</h2>
        <p className={style.email}>{email}</p>
      </article>

      <ChangePassForm />
    </section>
  );
};
