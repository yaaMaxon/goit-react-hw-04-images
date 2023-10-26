import css from './Modal.module.css';
import React, { useEffect } from 'react'

export const Modal = ({ onCloseModal, data }) => {

useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
  }
})

const onKeyDown = event => {
  if(event.code === 'Escape') {
    onCloseModal();
  }
}

const onOverlayClick = event => {
  if(event.currentTarget === event.target) {
    onCloseModal();
  }
}

    return (
      <div onClick={onOverlayClick} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={data} alt="" />
        </div>
      </div>
    )
}
