import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  // Функція фіксації змін в полі input
  onInputChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
  };
  // Функція обробки відправки форми
  onSubmit = evt => {
    evt.preventDefault();
    // Якщо поле порожне (з урахуванням пробілів) форма не відправиться, викликається повідомлення про помилку
    if (this.state.searchQuery.trim() === '') {
      toast.error('Enter a search query.');
      return;
    }
    this.props.handleSubmit(this.state.searchQuery);
    this.resetForm();
  };
  // Функція очищення поля вводу після відправки форми
  resetForm = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button
            type="submit"
            className={css.button}
            aria-label="Submit search query"
          >
            <span className={css.buttonLabel}></span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
