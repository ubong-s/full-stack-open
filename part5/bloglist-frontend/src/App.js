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
   const [loginDetails, setloginDetails] = useState({
      username: '',
      password: '',
   });
   const [errorMessage, setErrorMessage] = useState({ type: '', text: '' });
   const [user, setUser] = useState(null);
   const [newBlog, setNewBlog] = useState({
      title: '',
      author: '',
      url: '',
   });
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
         blogMessage?.text === 'token expired' ||
         errorMessage?.text === 'token expired'
      ) {
         handleLogout();
      }
   }, [errorMessage.text, blogMessage.text]);

   const createBlog = async (event) => {
      event.preventDefault();
      try {
         const blog = await blogService.create(newBlog);
         setBlogs(blogs.concat(blog));
         blogFormRef.current.toggleVisibility();

         setNewBlog({
            title: '',
            author: '',
            url: '',
         });
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

   const handleLogin = async (event) => {
      event.preventDefault();

      try {
         const user = await loginService.login(loginDetails);

         window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
         blogService.setToken(user.token);
         setUser(user);
         setloginDetails({
            username: '',
            password: '',
         });
      } catch (error) {
         setErrorMessage({ type: 'error', text: 'Wrong username or password' });
         setTimeout(() => {
            setErrorMessage({ type: '', text: '' });
         }, 5000);
      }
   };

   const handleLoginChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setloginDetails({
         ...loginDetails,
         [name]: value,
      });
   };

   const handleLogout = () => {
      window.localStorage.removeItem('loggedBlogAppUser');
      setUser(null);
      blogService.setToken(null);
   };

   const handleBlogChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setNewBlog({
         ...newBlog,
         [name]: value,
      });
   };

   return (
      <>
         {!user && (
            <>
               <h2>log in to application</h2>
               <Notification message={errorMessage} />

               <LoginForm
                  username={loginDetails.username}
                  password={loginDetails.password}
                  handleLoginChange={handleLoginChange}
                  handleLogin={handleLogin}
               />
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
               <Togglable buttonLabel='new note' ref={blogFormRef}>
                  <CreateBlogForm
                     blog={newBlog}
                     createBlog={createBlog}
                     handleBlogChange={handleBlogChange}
                  />
               </Togglable>

               <BlogList blogs={blogs} handleLogout={handleLogout} />
            </>
         )}
      </>
   );
};

export default App;
