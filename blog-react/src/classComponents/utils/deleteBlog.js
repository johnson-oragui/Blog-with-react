/* eslint-disable react/prop-types */ // Disables ESLint warnings about missing prop types

const deleteBlog = async (blogId) => {
  // Asynchronous function to delete a blog with the provided ID
  try {
    const url = import.meta.env.VITE_BLOGS_URL + `/${blogId}`; // Constructs the delete URL with blog ID
    const options = {
      method: 'DELETE', // Specifies a DELETE request for deletion
    };

    const res = await fetch(url, options); // Fetches data from the constructed URL with DELETE request options

    if (!res.ok) { // Checks for successful response
      throw new Error("Error deleting Blog"); // Throws an error if deletion fails
    }

    const blogData = await res.json(); // Parses the response as JSON
    console.log('blogData: ', blogData); // Logs the response data to the console

    return blogData; // Returns the response data
  } catch (e) {
    console.error('error: ', e); // Logs errors to the console
    return false; // Returns false on errors
  }
};

export default deleteBlog;
