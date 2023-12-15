import { FC } from 'react';

import style from './Info.module.scss';

interface InfoProps {
  imgUrl?: string;
  message: string;
}

export const Info: FC<InfoProps> = ({ imgUrl, message }) => {
  return (
    <article className={style.info}>
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="info"
        />
      ) : null}
      <h4>{message}</h4>
    </article>
  );
};
