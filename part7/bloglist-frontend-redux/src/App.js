import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import BlogList from './components/BlogList';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { initializeBlogsAsync } from './reducers/blogsReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
   const dispatch = useDispatch();

   const [errorMessage, setErrorMessage] = useState({ type: '', text: '' });
   const [user, setUser] = useState(null);
   const [blogMessage, setBlogMessage] = useState({ type: '', text: '' });

   const blogFormRef = useRef();

   useEffect(() => {
      dispatch(initializeBlogsAsync());
   }, [dispatch]);

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

   return (
      <>
         {!user && (
            <>
               <h2>log in to application</h2>
               <Notification />
               <LoginForm loginUser={loginUser} />
            </>
         )}

         {user && (
            <>
               <h2>blogs</h2>
               <Notification />
               <p>
                  {user.name || user.username} logged in
                  <button onClick={handleLogout}>logout</button>
               </p>
               <Togglable buttonLabel='new blog' ref={blogFormRef}>
                  <CreateBlogForm />
               </Togglable>
               <BlogList />
            </>
         )}
      </>
   );
};

export default App;
