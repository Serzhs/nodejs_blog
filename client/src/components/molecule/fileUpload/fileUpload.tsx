import React, { FC, useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './fileUpload.module.scss';
import { Image } from '../../atoms/image/image';
import { Button } from '../../atoms/button/button';

type Props = {
  label: string
  imageSrc?: string
  onChange: (file: File) => void
};

const id = uuidv4();

export const FileUpload:FC<Props> = ({
  label,
  onChange,
  imageSrc= ''
}) => {
  const [image, setImage]= useState(imageSrc);


  useEffect(() => {
    setImage(imageSrc);
  }, [imageSrc]);

  const fileInput = useRef<HTMLInputElement>(null);

  const fileChnageHandler = (file: File) => {
    setImage( URL.createObjectURL(file));

    onChange(file);
  };

  const openFileInput = () => {
    if (!fileInput.current) {
      return;
    }

    fileInput.current.click();

  };

  return (
    <div>
      <label htmlFor={id} className={style.wrapper}>
        <span className={style.label}>
          {label}
        </span>
        <Button
          styleType="secondary"
          onClick={openFileInput}
        >
          Upload File
        </Button>
        <input
          type="file"
          ref={fileInput}
          hidden
          id={id}
          onChange={(e) => {
            if (!e.target.files) {
              return;
            }

            fileChnageHandler(e.target.files[0]);
          }}
        />
      </label>
      {image && (
      <div className={style.imageWrapper}>
        <Image
          alt="Cover Image"
          src={image}
          w={4}
          h={2}
        />
      </div>
      )}
    </div>
  );
};
