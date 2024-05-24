import { Component } from 'react'; // Importing the Component class from React
import './CSS/App.css'; // Importing the CSS file for styling
import Footer from './classComponents/Footer'; // Importing the Footer component
import Header from './classComponents/Header'; // Importing the Header component
import Home from './classComponents/Home'; // Importing the Home component

class App extends Component {
  // The render method is used to define the JSX to be rendered to the DOM
  render() {
    return (
      <>
        {/* Rendering the Header component */}
        <Header />
        {/* Rendering the Home component */}
        <Home />
        {/* Rendering the Footer component */}
        <Footer />
      </>
    );
  }
}

// Exporting the App component as the default export
export default App;
