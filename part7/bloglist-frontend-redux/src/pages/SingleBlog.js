import { useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogAsync, updateBlogAsync } from '../reducers/blogsReducer';
import Comments from '../components/Comments';

const SingleBlog = () => {
   const dispatch = useDispatch();
   const match = useMatch('/blogs/:id');
   const blog = useSelector(({ blogs }) => {
      return blogs.find((b) => b.id === match.params.id);
   });

   const handleLikes = () => {
      const updatedBlogPost = {
         ...blog,
         likes: blog.likes + 1,
      };

      const payload = { id: blog.id, updatedBlogPost };
      dispatch(updateBlogAsync(payload));
   };

   const handleDelete = () => {
      if (window.confirm(`Remove blog ${blog.title}`)) {
         dispatch(deleteBlogAsync(blog.id));
      }
   };

   if (!blog) {
      return null;
   }
   return (
      <div>
         <h2>
            <span>{blog.title}</span> <span>{blog.author}</span>
         </h2>
         <a href={blog.url} target='_blank' rel='noreferrer'>
            {blog.url}
         </a>
         <div className='likes'>
            likes {blog.likes}{' '}
            <button className='like-btn' onClick={handleLikes}>
               like
            </button>
         </div>
         <span>added by {blog.user.name}</span>

         <button onClick={handleDelete} className='delete'>
            remove
         </button>

         <Comments id={blog.id} comments={blog.comments} />
      </div>
   );
};

export default SingleBlog;
