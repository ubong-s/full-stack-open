import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import BlogList from '../components/BlogList';
import CreateBlogForm from '../components/CreateBlogForm';
import Togglable from '../components/Togglable';

const Blogs = () => {
   const dispatch = useDispatch();
   const blogFormRef = useRef();

   return (
      <div>
         <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <CreateBlogForm />
         </Togglable>
         <BlogList />
      </div>
   );
};

export default Blogs;
