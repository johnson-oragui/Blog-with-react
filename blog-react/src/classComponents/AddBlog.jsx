/* eslint-disable react/prop-types */
import { Component } from 'react'; // Imports the React Component class for building stateful components
import { v4 as uuidv4 } from 'uuid'; // Imports the v4 function from uuid to generate unique IDs

class AddBlog extends Component {
  state = {
    userName: '', // Stores the user name for the new blog
    title: '', // Stores the title for the new blog
    content: '', // Stores the content for the new blog
  };

  // Static property used to store a success message (currently commented out)
  static success = '';

  // // handle title input change separately
  // handleTitleChange = (e) => {
  //   this.setState({ title: e.target.value });
  // };

  // // handle content input change separately
  // handleContentChange = (e) => {
  //   this.setState({ content: e.target.value });
  // };

  // handleChangeDestructure = (e) => {
  //   // destructures name and value from e.target.
  //   const { name, value } = e.target;
  //   // The state is updated dynamically with { [name]: value }, where name is the key and value is the new value
  //   this.setState({ [name]: value });
  // };

  // Handles changes in all input fields (name, title, content)
  handleChange = (e) => {
    if (e.target.value.trim() !== '' && e.target.value !== undefined) { // Ensures value is not empty or undefined
      return this.setState({ // Updates state dynamically using computed property names
        [e.target.name]: e.target.value
      });
    }
  };

  handleSubmit = async (e) => {
    // Prevents default form submission behavior
    e.preventDefault();
    try {
      const dateString = new Date().toUTCString(); // Creates a UTC formatted date string

      const blog = { // Creates a new blog object 
        id: uuidv4().toString(), // Generates a unique ID using uuid
        userName: this.state.userName, // Uses user name from state
        title: this.state.title, // Uses title from state
        content: this.state.content, // Uses content from state
        createdAt: new Date(dateString), // Creates a date object from the date string
      };
      const url = import.meta.env.VITE_BLOGS_URL; // Fetches the blog data URL from the environment variables

      const options = { // Defines request options for the fetch call
        method: 'POST', // Specifies a POST request
        headers: { // Sets headers for sending JSON data
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo) // Converts the blog object to JSON string for sending in the request body
      };
      const res = await fetch(url, options); // Fetches data from the provided URL with specified options

      if (res.ok) { // Checks for successful response
        this.setState({ // Clears the input fields after successful submission
          userName: '',
          title: '',
          content: ''
        });
        this.success = 'Success'; // Sets the success message (currently commented out)
      }
      // Parses the response as JSON and stores the data in blogData
      const blogData = await res.json();
      // Logs the blog data to the console
      console.log('blogData: ', blogData);
      // Calls the addNewBlog prop function
      this.props.addNewBlog(blogData);
    } catch (e) {
      // Logs errors to the console
      console.error('error: ', e);
    }
    
  };
  render() {
    return (
      <>
         {/* Form for submitting new blog entries */}
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type='text'
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='Name' required
          />


          <label>Title</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
            placeholder='blog title'
            required
          />

          <label>Content</label>
          <input
            type='text'
            name='content'
            value={this.state.content}
            onChange={this.handleChange}
            placeholder='blog Content'
            required
          />

          <input
            type='submit'
          />
        </form>
        <p>{this.success && this.success}</p>
      </>
      
    );
  }
}

export default AddBlog;
