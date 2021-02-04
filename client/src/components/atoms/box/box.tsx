import React, { FC } from 'react';
import style from './box.module.scss';

type Props = {
  small?: boolean
};

export const Box:FC<Props> = ({ children, small }) => {
  return (
    <div className={`${style.box} ${small && style.boxSmall}`}>
      {children}
    </div>
  );
};
