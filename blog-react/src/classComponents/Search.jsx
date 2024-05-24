import { Component } from 'react';
import '../CSS/search.css';

class Search extends Component {
  render() {
    return (
      <div className='search-container'>
          {/* <span className='search-icon'>&#128269;</span> */}
          <span className="fas fa-search search-icon" />
          <input type='text' placeholder='search Todo'/>
      </div>
    );
  }
}

export default Search;
