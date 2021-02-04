import React, { FC } from 'react';
import styles from './typography.module.scss';

export const H1:FC = ({ children }) => {
  return (
    <h1 className={styles.heading1}>
      {children}
    </h1>
  );
};

export const H2:FC = ({ children }) => {
  return (
    <h2 className={styles.heading2}>
      {children}
    </h2>
  );
};

export const H3:FC = ({ children }) => {
  return (
    <h3 className={styles.heading3}>
      {children}
    </h3>
  );
};


export const H4:FC = ({ children }) => {
  return (
    <h4 className={styles.heading4}>
      {children}
    </h4>
  );
};

export const P:FC = ({ children }) => {
  return (
    <p className={styles.paragraph}>
      {children}
    </p>
  );
};

export const Small:FC = ({ children }) => {
  return (
    <span className={styles.info}>
      {children}
    </span>
  );
};
