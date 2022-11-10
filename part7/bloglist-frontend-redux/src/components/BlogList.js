import Blog from './Blog';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const BlogList = () => {
   const blogs = useSelector(({ blogs }) => {
      return [...blogs].sort((a, b) => b.likes - a.likes);
   });

   return (
      <div>
         {blogs.length > 0 &&
            blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
   );
};

export default BlogList;
