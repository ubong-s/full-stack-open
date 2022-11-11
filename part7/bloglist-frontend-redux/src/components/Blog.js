import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
   return (
      <div className='blog'>
         <Link to={`/blogs/${blog.id}`}>
            <span>{blog.title}</span> <span>{blog.author}</span>
         </Link>
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
};

export default Blog;
