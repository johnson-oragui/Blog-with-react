import { Component } from 'react'; // Imports the React Component class for building stateful components
import UpdateBlog from './UpdateBlog'; // Imports the UpdateBlog component for updating blog entries
import AddBlog from './AddBlog'; // Imports the AddBlog component for adding new blog entries
import deleteBlog from './utils/deleteBlog'; // Imports the deleteBlog function (assumed to be an external function for deleting blogs)

class Blogs extends Component {
  // Defines a React class component named Blogs
  state = {
    blogs: [], // Array to store blog data
    isLoading: true, // Flag indicating data loading state
    error: '', // String to store any errors encountered
    selectedBlogId: {}, // empty object to store the ID of the currently selected blog for update
    viewAddBlog: false // Flag to control displaying the AddBlog component
  };
  componentDidMount() {
    // Lifecycle method called after component mounts (when the component is first inserted into the DOM)
    this.fetchBlogs(); // Calls the fetchBlogs function to retrieve blog data
  }
  fetchBlogs = async () => {
    // Asynchronous function to fetch blog data
    const url = import.meta.env.VITE_BLOGS_URL; // Fetches the blog data URL from the environment variables
    try {
      const res = await fetch(url); // Fetches data from the provided URL
      if (!res.ok) { // Checks for successful response
        throw new Error('Network response was not ok'); // Throws an error if response is not OK
      }
      const allBlogs = await res.json(); // Parses the response as JSON
      this.setState({ blogs: allBlogs, isLoading: false }); // Updates state with fetched blogs and sets loading state to false
    } catch (e) {
      this.setState((prevState) => prevState.error = e.message); // Updates state with error message
      console.error('error: ', e); // Logs the error to the console
    }
  };


  // Toggles the selected blog ID and conditionally renders UpdateBlog
  handleUpdate = (blog) => {
    // console.log('blog: ', blog);
    if (Object.keys(this.state.selectedBlog).length === 0) {
      this.setState({ selectedBlog: blog })
    } else {
      this.setState({
        selectedBlog: {}
      })
    }
  };

  handleOnChange = (e) => {
    // Handles input field changes
    const [name, value] = e.target; // Destructures name and value from the event target
    this.setState({ [name]: value }) // Updates state based on the changed input field
  };

  addNewBlog = (newBlog) => {
    // Function to add a new blog to the state
    this.setState((prevState) => ({
      blogs: [...prevState.blogs, newBlog] // Adds the new blog to the blogs array in state
    }));
  };

  // Updates the state with the newly updated blog
  updateNewBlog = (updatedBlog) => {
    // Creates a copy of the blogs array to avoid mutation
    const blogsCopy = this.state.blogs;
    // Filters out the old version of the blog
    const newBlog = blogsCopy.filter((blog) => blog.id !== updatedBlog.id);
    // Updates state with the updated blog at the beginning and the filtered blogs
    this.setState({ blogs: [updatedBlog, ...newBlog] });
  };

  // Toggles the viewAddBlog state for displaying AddBlog
  handleView = () => this.setState({ viewAddBlog: this.state.viewAddBlog ? false : true });
  // Handles blog deletion with confirmation prompt and state update
  handleDelete = (blogToDelete) => {
    // Prompts for deletion confirmation
    const response = prompt("confirm deletion: yes or no");
    if (response.toLowerCase() === "yes") {
      // Calls the external deleteBlog function with the blog ID
      const res = deleteBlog(blogToDelete.id);
      // Alerts if deletion fails
      if (!res) alert("Could not delete Blog");
      // Alerts on successful deletion
      alert("SUccesfully deleted!");
      // Creates a copy of the blogs array
      const blogsCopy = this.state.blogs;
      // Filters out the deleted blog
      const newBlog = blogsCopy.filter((blog) => blog.id !== blogToDelete.id);
      // Updates state with the filtered blogs
      this.setState({ blogs: [...newBlog] });
      
    } else if (response.toLowerCase() === "no") {
      // canceles deletion if the user entered 'no'
      alert("Deletion cancelled");
    }
  };

  // Renders the JSX elements of the Blogs component
  render() {
    // destructure state
    const { blogs, isLoading, error, selectedBlog, viewAddBlog } = this.state;
    
    return (
      <>
        <button onClick={this.handleView}>Toggle to add new Blog</button>
        {/* Conditionally renders the AddBlog component based on viewAddBlog state */}
        {viewAddBlog ? (<AddBlog addNewBlog={this.addNewBlog} />) : null}
        {/* Conditionally renders "Update selected Blog" message based on selectedBlog length */}
        {Object.keys(selectedBlog).length > 0 && <p>Update selected Blog</p>}
        {/* Conditionally renders UpdateBlog component based on selectedBlog length and passes blog and updateNewBlog props*/}
        {Object.keys(selectedBlog).length > 0 &&  <UpdateBlog blog={selectedBlog} updateNewBlog={this.updateNewBlog}/>}
        
        <div>
          {/* Conditionally renders "Data Loading" message while data is fetched */}
          {isLoading && <p>Data Loading</p>}
          {/* Conditionally renders error message if there's an error */}
          {error && <p>{error}</p>}
          {/* Conditionally renders list items for blogs if blogs exist */}
          <ul className="blogs">
            {blogs.length > 0 ? (blogs.map((blog) => (
              <li
              {/* Renders blog title and username */}
                key={blog.id}>
                {blog.title} by {blog.userName}
                {/* Button to toggle update mode for the blog */}
                <button onClick={() => this.handleUpdate(blog)}>Toggle to Update: {blog.id}</button>
                {/* Button to delete the blog */}
                <button onClick={() => this.handleDelete(blog)}>Delete {blog.id}</button>
              </li>
            ))) : (!isLoading && <>No Blog Found</>)}
            {/* Renders "No Blog Found" if no blogs exist and data is not loading */}
          </ul>
        </div>
      </>
      
    );
  }
}

export default Blogs;
