import React, { FC } from 'react';
import style from './button.module.scss';

type Props = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  styleType?: 'primary' | 'secondary'
};

export const Button: FC<Props> = ({
  children,
  onClick,
  type = 'button',
  disabled,
  styleType = 'primary'
}) => {

  return (
    <button
      className={`${style.button} ${styleType === 'secondary' && style.buttonSecondary}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
