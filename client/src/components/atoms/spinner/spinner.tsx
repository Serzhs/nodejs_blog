import React, { FC } from 'react';
import style from './spinner.module.scss';

export const Spinner: FC = () => {
  return (<div className={style.loader} />);
};
