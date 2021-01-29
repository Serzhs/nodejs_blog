import React, { FC } from 'react';
import { Image } from '../../atoms/image/image';
import style from './card.module.scss';


type Props = {
  title: string,
  imgSrc: string,
  onReadMore: () => void
  onEditClick: () => void
  onDeleteClick: () => void
};


export const Card:FC<Props> = ({
  title,
  imgSrc,
  onReadMore,
  onEditClick,
  onDeleteClick
}) => {

  return (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`${style.card} btn`}
      onClick={onReadMore}
    >
      <Image
        w={3}
        h={2}
        src={imgSrc}
        alt={title}
      />
      <div className={style.content}>
        <h3>{title}</h3>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick();
            }}
            className='btn btn-warning'
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick();
            }}
            className='btn btn-danger'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
