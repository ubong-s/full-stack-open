import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { initializeBlogsAsync } from './reducers/blogsReducer';
import { logoutUser, logoutUserAsync, setUser } from './reducers/userReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
   const dispatch = useDispatch();

   const [errorMessage, setErrorMessage] = useState({ type: '', text: '' });

   const [blogMessage, setBlogMessage] = useState({ type: '', text: '' });

   const { user, notification } = useSelector((state) => state);

   const blogFormRef = useRef();

   useEffect(() => {
      dispatch(initializeBlogsAsync());
   }, [dispatch]);

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON);
         dispatch(setUser(user));
         blogService.setToken(user.token);
      }
   }, []);

   const handleLogout = () => {
      dispatch(setUser(null));
      window.localStorage.removeItem('loggedBlogAppUser');
      blogService.setToken(null);
   };

   return (
      <>
         {!user && (
            <>
               <h2>log in to application</h2>
               <Notification />
               <LoginForm />
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
