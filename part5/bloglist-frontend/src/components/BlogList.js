import Blog from './Blog';

const BlogList = ({ blogs, user, handleLogout }) => {
   return (
      <>
         <h2>blogs</h2>
         <p>
            {user.name || user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
         </p>
         {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
         ))}
      </>
   );
};

export default BlogList;
