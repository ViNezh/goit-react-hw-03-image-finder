import css from './modal.module.css';
import { Component } from 'react';

export default class Modal extends Component {
  // Прослуховування події натискання клавіши ESC при відкритому модальному вікні
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  // Скидання прослуховування події натискання клавіши ESC при закритті модального вікна
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
  // Функція обробки натискання клавіши ESC
  handleKeydown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };
  // Функція обробки кліку мишкою по back drop
  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>
    );
  }
}
