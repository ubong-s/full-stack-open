import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogList = ({ blogs, updateLikes, deleteBlog }) => {
   return (
      <>
         {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
               <Blog
                  key={blog.id}
                  blog={blog}
                  updateLikes={updateLikes}
                  deleteBlog={deleteBlog}
               />
            ))}
      </>
   );
};

BlogList.propTypes = {
   blogs: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
   ),
   updateLikes: PropTypes.func.isRequired,
   deleteBlog: PropTypes.func.isRequired,
};

export default BlogList;
