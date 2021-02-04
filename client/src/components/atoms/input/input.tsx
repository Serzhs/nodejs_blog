import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './input.module.scss';

type Props = {
  label: string
  placeholder: string
  type: string
  required?: boolean
  value: string
  minLength?: number
  maxLength?: number
  onChange: (value: string) => void
};

const id = uuidv4();

export const Input:FC<Props> = ({
  label,
  type,
  value,
  placeholder,
  required,
  minLength,
  maxLength,
  onChange
}) => {

  return (
    <label htmlFor={id} className={style.wrapper}>
      <span className={style.label}>{label}</span>
      <input
        className={style.input}
        type={type}
        id={id}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
};
