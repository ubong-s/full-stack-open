import { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
   const [blogs, setBlogs] = useState([]);
   const [errorMessage, setErrorMessage] = useState({ type: '', text: '' });
   const [user, setUser] = useState(null);
   const [blogMessage, setBlogMessage] = useState({ type: '', text: '' });

   const blogFormRef = useRef();

   useEffect(() => {
      async function fetchData() {
         try {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
         } catch (error) {
            setBlogMessage({
               type: 'error',
               text: 'error fetching blogs',
            });

            setTimeout(() => {
               setBlogMessage({ type: '', text: '' });
            }, 5000);
         }
      }

      fetchData();
   }, []);

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON);
         setUser(user);
         blogService.setToken(user.token);
      }
   }, []);

   useEffect(() => {
      if (
         blogMessage.text === 'token expired' ||
         errorMessage.text === 'token expired'
      ) {
         handleLogout();
      }
   }, [errorMessage.text, blogMessage.text]);

   const createBlog = async (newBlog) => {
      try {
         const blog = await blogService.create(newBlog);
         setBlogs(blogs.concat(blog));
         blogFormRef.current.toggleVisibility();

         setBlogMessage({
            type: 'success',
            text: `a new blog ${blog.title} by ${blog.author} added`,
         });

         setTimeout(() => {
            setBlogMessage({ type: '', text: '' });
         }, 5000);
      } catch (error) {
         console.log(error);
         setBlogMessage({ type: 'error', text: error.response.data.error });

         setTimeout(() => {
            setBlogMessage({ type: '', text: '' });
         }, 5000);
      }
   };

   const loginUser = async (loginDetails) => {
      try {
         const user = await loginService.login(loginDetails);
         window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
         blogService.setToken(user.token);
         setUser(user);
      } catch (error) {
         setErrorMessage({ type: 'error', text: 'Wrong username or password' });
         setTimeout(() => {
            setErrorMessage({ type: '', text: '' });
         }, 5000);
      }
   };

   const handleLogout = () => {
      window.localStorage.removeItem('loggedBlogAppUser');
      setUser(null);
      blogService.setToken(null);
   };

   const updateLikes = async (id, updatedBlogPost) => {
      let tempBlogs = [...blogs];
      try {
         tempBlogs = tempBlogs.map((blog) => {
            if (blog.id === updatedBlogPost.id) {
               return {
                  ...blog,
                  likes: updatedBlogPost.likes,
               };
            }

            return blog;
         });
         await blogService.update(id, updatedBlogPost);
         setBlogs(tempBlogs);
      } catch (error) {
         setBlogMessage({
            type: 'error',
            text: `error updating ${updatedBlogPost.title}`,
         });
         setTimeout(() => {
            setBlogMessage({ type: '', text: '' });
         }, 5000);
      }
   };

   const deleteBlog = async (blog) => {
      try {
         await blogService.deleteBlog(blog.id);
         setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
         setBlogMessage({
            type: 'success',
            text: `${blog.title} deleted`,
         });

         setTimeout(() => {
            setBlogMessage({ type: '', text: '' });
         }, 5000);
      } catch (error) {
         setBlogMessage({
            type: 'error',
            text: `error deleting ${blog.title}`,
         });
         setTimeout(() => {
            setBlogMessage({ type: '', text: '' });
         }, 5000);
      }
   };

   return (
      <>
         {!user && (
            <>
               <h2>log in to application</h2>
               <Notification message={errorMessage} />
               <LoginForm loginUser={loginUser} />
            </>
         )}

         {user && (
            <>
               <h2>blogs</h2>
               <Notification message={blogMessage} />
               <p>
                  {user.name || user.username} logged in
                  <button onClick={handleLogout}>logout</button>
               </p>
               <Togglable buttonLabel='new blog' ref={blogFormRef}>
                  <CreateBlogForm createBlog={createBlog} />
               </Togglable>
               <BlogList
                  blogs={blogs}
                  handleLogout={handleLogout}
                  updateLikes={updateLikes}
                  deleteBlog={deleteBlog}
               />
            </>
         )}
      </>
   );
};

export default App;
