import { Component } from 'react';
import NavBar from './NavBar';
import Search from './Search';
import '../CSS/header.css';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h1>logo</h1>
        <NavBar />
        <Search />
      </div>
    );
  }
}

export default Header;
