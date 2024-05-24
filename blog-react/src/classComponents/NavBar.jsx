import { Component } from 'react';
import Home from './Home';
import About from './About';
import '../CSS/navbar.css';

class NavBar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <ul>
          <li>
            <a href={<Home />}>Home</a>
          </li>
          <li>
            <a href={<About />}>About</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
