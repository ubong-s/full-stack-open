import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Navbar from './components/Navbar';
import { setUser } from './reducers/userReducer';
import { initializeBlogsAsync } from './reducers/blogsReducer';
import blogService from './services/blogs';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';
import SingleBlog from './pages/SingleBlog';

const App = () => {
   const dispatch = useDispatch();
   const {
      user: { currentUser: user },
      notification,
   } = useSelector((state) => state);

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

   useEffect(() => {
      if (notification.text === 'Request failed with status code 401') {
         dispatch(setUser(null));
         blogService.setToken(null);
         window.localStorage.removeItem('loggedBlogAppUser');
      }
   }, [notification.text]);

   return (
      <>
         <Router>
            {!user && (
               <>
                  <h2>log in to application</h2>
                  <Notification />
                  <LoginForm />
               </>
            )}

            {user && (
               <>
                  <Navbar />
                  <h2>blogs</h2>
                  <Notification />

                  <Routes>
                     <Route path='/blogs/:id' element={<SingleBlog />} />
                     <Route path='/users/:id' element={<SingleUser />} />
                     <Route path='/users' element={<Users />} />
                     <Route path='/' element={<Blogs />} />
                  </Routes>
               </>
            )}
         </Router>
      </>
   );
};

export default App;
