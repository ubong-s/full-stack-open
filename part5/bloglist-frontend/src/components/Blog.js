import { useState } from 'react';

const Blog = ({ blog, updateLikes }) => {
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
         </div>
      </div>
   );
};

export default Blog;
