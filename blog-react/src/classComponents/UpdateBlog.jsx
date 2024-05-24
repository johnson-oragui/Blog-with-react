/* eslint-disable react/prop-types */
import { Component } from 'react';

class UpdateBlog extends Component {
  state = {
    // Stores the title for updating the blog
    title: '',
    // Stores the content for updating the blog
    content: ''
  };

  // Static property used to store a success message
  static success = '';

  handleChange = (e) => {
    // destructures name and value from e.target.
    const { name, value } = e.target;
    // Ensures value is not empty or undefined before updating state
    if (e.target.value.trim() !== '' && e.target.value !== undefined) {
      // Handles changes in both title and content input fields
      // Updates state dynamically with computed property names
      return this.setState({ [name]: value });
    }
  };

  handleSubmit = async (e) => {
    // Prevents default form submission behavior
    e.preventDefault();
    // Destructures the blog prop from props
    const { blog } = this.props;
    const { title, content } = this.state; // Destructures title and content from state

    if (title.trim() === "" || content.trim() === "") { // Validates for empty title or content
      throw new Error("Cannot add empty Blog"); // Throws an error if empty
    }
    try {
      const dateString = new Date().toUTCString(); // Creates a UTC formatted date string

      const blog = { // Creates a new blog object for update (consider renaming "blog" to "updatedBlog")
        id: blog.id, // Uses the existing ID from the passed blog prop
        title, // Uses the updated title from state
        userName: blog.userName, // Retains the original username from the passed blog prop
        content, // Uses the updated content from state
        createdAt: blog.createdAt, // Retains the original creation date from the passed blog prop
        updatedAt: new Date(dateString) // Sets the updated date
      };
      const url = import.meta.env.VITE_BLOGS_URL + `/${blog.id}`; // Constructs the update URL with blog ID

      const options = { // Defines request options for the fetch call
        method: 'PUT', // Specifies a PUT request for updating
        headers: {
          'Content-Type': 'application/json' // Sets header for sending JSON data
        },
        body: JSON.stringify(blog) // Converts the updated blog object to JSON string for sending in the request body
      };

      const res = await fetch(url, options); // Fetches data from the constructed URL with PUT request options

      if (res.ok) { // Checks for successful response
        this.setState({ // Clears the input fields after successful update
          title: '',
          content: ''
        });
        this.success = 'Success'; // Sets the success message (currently commented out)
      }
      const blogData = await res.json(); // Parses the response as JSON and stores the data in blogData
      console.log('blogData: ', blogData); // Logs the updated blog data to the console

      this.props.updateNewBlog(blogData); // Calls the updateNewBlog prop function to pass the updated blog data
    } catch (e) {
      console.error('error: ', e); // Logs errors to the console
    }
    
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
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
            type='submit' value={`submit:${this.props.blog.id}`}
          />
        </form>
        <p>{this.success && this.success}</p>
      </>
      
    );
  }
}

export default UpdateBlog;
