import { Component } from 'react';
import '../CSS/footer.css';

class Footer extends Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <div className='footer'>
        {/* <p>Copyright © 2024</p> */}
        {/* <p>Copyright &#169; 2024</p> */}
        <p>Todo App Copyright &copy; {year}</p>
      </div>
    );
  }
}

export default Footer;
