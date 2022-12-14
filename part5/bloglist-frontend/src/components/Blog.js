import PropTypes from 'prop-types';
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
         id: blog.id,
         title: blog.title,
         author: blog.author,
         url: blog.url,
         likes: blog.likes + 1,
         user: blog.user.id,
      };
      updateLikes(blog.id, updatedBlogPost);
   };

   const handleDelete = () => {
      if (window.confirm(`Remove blog ${blog.title}`)) {
         deleteBlog(blog);
      }
   };

   return (
      <div style={blogStyle} className='blog'>
         <div>
            <span>{blog.title}</span> <span>{blog.author}</span>
            <button className='toggle-details' onClick={toggleShowDetails}>
               {showDetails ? 'hide' : 'view'}
            </button>
         </div>
         {showDetails && (
            <div className='toggled-section'>
               <div>{blog.url}</div>
               <div className='likes'>
                  likes {blog.likes}{' '}
                  <button className='like-btn' onClick={handleLikes}>
                     like
                  </button>
               </div>
               <div>{blog.user && (blog.user.name || blog.user.username)}</div>
               <button
                  style={{ backgroundColor: 'blue', color: 'white' }}
                  onClick={handleDelete}
                  className='delete-btn'
               >
                  remove
               </button>
            </div>
         )}
      </div>
   );
};

Blog.propTypes = {
   blog: PropTypes.shape({
      author: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      user: PropTypes.shape({
         id: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
         username: PropTypes.string.isRequired,
      }),
   }),
   updateLikes: PropTypes.func.isRequired,
   deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
