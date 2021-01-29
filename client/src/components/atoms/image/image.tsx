import React, { FC }  from 'react';
import style from './image.module.scss';

type Props = {
  w: number,
  h: number,
  src: string,
  alt: string
};

export const Image:FC<Props> = ({ w, h, src, alt }) => {
  return (
    <figure
      className={style.figure}
      style={{
        paddingTop:  `${h / w * 100}%`
      }}
    >
      <img src={src} alt={alt} className={style.image} />
    </figure>
  );
};
