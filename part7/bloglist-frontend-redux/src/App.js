import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogsAsync } from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';
import blogService from './services/blogs';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';

const App = () => {
   const dispatch = useDispatch();
   const {
      user: { currentUser: user },
   } = useSelector((state) => state);

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
            <Router>
               <h2>blogs</h2>
               <Notification />
               <div>
                  <p>{user.name || user.username} logged in</p>
                  <button onClick={handleLogout}>logout</button>
               </div>

               <Routes>
                  <Route path='/users/:id' element={<SingleUser />} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/blogs' element={<Blogs />} />
               </Routes>
            </Router>
         )}
      </>
   );
};

export default App;
