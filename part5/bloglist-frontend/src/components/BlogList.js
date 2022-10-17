import Blog from './Blog';

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

export default BlogList;
