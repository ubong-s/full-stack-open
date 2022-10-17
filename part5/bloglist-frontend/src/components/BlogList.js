import Blog from './Blog';

const BlogList = ({ blogs, updateLikes }) => {
   return (
      <>
         {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />
         ))}
      </>
   );
};

export default BlogList;
