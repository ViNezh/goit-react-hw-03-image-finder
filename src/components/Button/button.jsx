import React from 'react';
import css from './button.module.css';
export const Button = ({ onClick }) => {
  return (
    <button
      type="button"
      className={css.Button}
      onClick={() => {
        onClick();
      }}
      aria-label="Button load more images"
    >
      Load more
    </button>
  );
};
