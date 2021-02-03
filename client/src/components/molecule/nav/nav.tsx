import React from 'react';
import { Link } from 'react-router-dom';
import style from './nav.module.scss';

export const Nav = () => {
  return (
    <nav className={style.nav}>
      <Link className={style.navItem} to="/">
        Home
      </Link>
      <Link className={style.navItem} to="/create">
        Create
      </Link>
    </nav>
  );
};
