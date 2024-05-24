import { Component } from 'react';
import '../CSS/home.css';
import Blogs from './Blogs';


class Home extends Component {
  render() {
    return (
      <>
        <h1 className='home'>Home</h1>
        
        <h2>Blogs</h2>
        <Blogs />
      </>
    );
  }
}

export default Home;
