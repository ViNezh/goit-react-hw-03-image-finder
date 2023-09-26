import { Component } from 'react';
import Searchbar from './Searchbar/searchbar';

class App extends Component {
  state = {
    searchQuerry: '',
  };

  searchSubmit = searchQuerry => {
    this.setState({ searchQuerry });
  };

  render() {
    return (
      <>
        <Searchbar handleSubmit={this.searchSubmit} />
      </>
    );
  }
}
export default App;
