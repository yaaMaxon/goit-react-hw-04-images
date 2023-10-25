import css from './Modal.module.css';

import React, { Component } from 'react'

export default class Modal extends Component {

componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown)
}

componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
}

onKeyDown = event => {
  if(event.code === 'Escape') {
    this.props.onCloseModal();
  }
}

onOverlayClick = event => {
  if(event.currentTarget === event.target) {
    this.props.onCloseModal();
  }
}

  render() {
    return (
      <div onClick={this.onOverlayClick} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.data} alt="" />
        </div>
      </div>
    )
  }
}
