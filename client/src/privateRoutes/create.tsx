import React, { FC } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { User } from '../App';

type Props = {
  user?: User
  path: string
};

export const PrivateCreate:FC<Props> = ({
  user,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return children;
        }
        return <Redirect to={{ pathname: '/login' }} />;
      }}
    />
  );
};
