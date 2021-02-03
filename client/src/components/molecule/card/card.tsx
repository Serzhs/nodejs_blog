import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Image } from '../../atoms/image/image';
import style from './card.module.scss';
import { Button } from '../../atoms/button/button';
import { H3 } from '../../atoms/typography/typography';

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
    <div
      className={style.card}
      onClick={onReadMore}
    >
      <Image
        w={4}
        h={2}
        src={imgSrc}
        alt={title}
      />
      <div className={style.content}>
        <H3>{title}</H3>
        <div className={style.cardActions}>
          <span
            className={style.action}
            onClick={(e) =>  {
              e.stopPropagation();
              onEditClick();
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
            {' '}
            Edit
          </span>

          <span
            className={`${style.action} ${style.danger}`}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            {' '}
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};
