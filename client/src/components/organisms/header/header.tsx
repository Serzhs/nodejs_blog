import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../../App';
import { Nav } from '../../molecule/nav/nav';
import style from './header.module.scss';
import { useApiCall } from '../../../hooks/useApiCall';

export const Header = () => {
  const user = useContext(UserContext);
  const { loading, apiCall } = useApiCall();

  const logoutHandler = () => {
    if (loading) {
      return;
    }

    apiCall.get('/user/logout').then((res) => {
      window.location.reload();
    });
  };

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
            {!user?.user ? (
              <>
                <NavLink className={style.authItem} to="/login">
                  Login
                </NavLink>
                <NavLink className={style.authItem} to="/register">
                  Register
                </NavLink>
              </>
            ) : (
              <div>
                <span className={style.greetings}>
                  Hello, {user.user.username}!
                </span>
                <span
                  className={style.logout}
                  onClick={logoutHandler}
                >
                  Logout
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
