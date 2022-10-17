import { useState } from 'react';

const Blog = ({ blog, updateLikes, deleteBlog }) => {
   const [showDetails, setShowDetails] = useState(false);

   const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
   };

   const toggleShowDetails = () => setShowDetails(!showDetails);

   const handleLikes = () => {
      const updatedBlogPost = {
         ...blog,
         likes: blog.likes + 1,
      };
      updateLikes(blog.id, updatedBlogPost);
   };

   const handleDelete = () => {
      if (window.confirm(`Remove blog ${blog.title}`)) {
         deleteBlog(blog);
      }
   };

   return (
      <div style={blogStyle}>
         <div>
            {blog.title} {blog.author}
            <button onClick={toggleShowDetails}>
               {showDetails ? 'hide' : 'view'}
            </button>
         </div>
         <div style={{ display: showDetails ? '' : 'none' }}>
            <div>{blog.url}</div>
            <div>
               likes {blog.likes} <button onClick={handleLikes}>like</button>
            </div>
            <div>{blog.user && (blog.user.name || blog.user.username)}</div>
            <button
               style={{ backgroundColor: 'blue', color: 'white' }}
               onClick={handleDelete}
            >
               remove
            </button>
         </div>
      </div>
   );
};

export default Blog;
