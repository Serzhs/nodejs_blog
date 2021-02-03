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
    <label htmlFor={id}>
      <span>{label}</span>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
};
