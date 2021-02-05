import React,  { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './nav.module.scss';
import { User } from '../../../App';

type Props = {
  user?: User
};

export const Nav:FC<Props> = ({ user }) => {
  return (
    <nav className={style.nav}>
      <Link className={style.navItem} to="/">
        Home
      </Link>
      {user && (
      <Link className={style.navItem} to="/create">
        Create
      </Link>
      )}
    </nav>
  );
};
