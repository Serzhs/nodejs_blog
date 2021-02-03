import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from '../../molecule/nav/nav';
import style from './header.module.scss';


export const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className="row middle-xs">
          <div className="col-xs-3">
            <NavLink to="/" className={style.logo}>
              Logo
            </NavLink>
          </div>
          <div className="col-xs-6 center-xs">
            <Nav />
          </div>
          <div className="col-xs-3 d-flex end-xs">
            <NavLink className={style.authItem} to="/login">
              Login
            </NavLink>
            <NavLink className={style.authItem} to="/register">
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
