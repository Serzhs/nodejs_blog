import React from 'react';
import style from './footer.module.scss';

export const Footer = () => {

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            © 2021-{new Date().getFullYear()} Jānis Seržants. All rights reserved. :)
          </div>
        </div>
      </div>
    </footer>
  );
};
