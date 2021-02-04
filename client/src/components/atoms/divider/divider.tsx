import React, { FC } from 'react';
import style from './divider.module.scss';

export const Divider:FC = () => {
  return (
    <hr className={style.divider} />
  );
};
