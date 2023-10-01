import React from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ deskr, source, onClick }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={onClick}
      aria-label="Click to view in large format"
    >
      <img src={source} alt={deskr} className={css.image} width="640px" />
    </li>
  );
};
