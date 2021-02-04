import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './textarea.module.scss';

type Props = {
  label: string
  placeholder: string
  type: string
  required?: boolean
  value: string
  onChange: (value: string) => void
};

const id = uuidv4();

export const Textarea:FC<Props> = ({
  label,
  type,
  value,
  placeholder,
  required,
  onChange
}) => {

  return (
    <label className={style.wrapper} htmlFor={id}>
      <span className={style.label}>{label}</span>
      <textarea
        id={id}
        className={style.textarea}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
};
