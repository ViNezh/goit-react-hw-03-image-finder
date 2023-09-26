import { Component } from 'react';
import css from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuerry: '',
  };

  onInputChange = evt => {
    this.setState({ searchQuerry: evt.currentTarget.value });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.handleSubmit(this.state.searchQuerry);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ searchQuerry: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuerry}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
