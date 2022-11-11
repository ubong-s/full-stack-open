import { useEffect } from 'react';
import {
   BrowserRouter as Router,
   Routes,
   Route,
   useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { setUser } from './reducers/userReducer';
import blogService from './services/blogs';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';
import SingleBlog from './pages/SingleBlog';
import { initializeBlogsAsync } from './reducers/blogsReducer';

const App = () => {
   const dispatch = useDispatch();
   const {
      user: { currentUser: user },
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

   const handleLogout = () => {
      dispatch(setUser(null));
      window.localStorage.removeItem('loggedBlogAppUser');
      blogService.setToken(null);
   };

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
                  <h2>blogs</h2>
                  <Notification />
                  <div>
                     <p>{user.name || user.username} logged in</p>
                     <button onClick={handleLogout}>logout</button>
                  </div>

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
