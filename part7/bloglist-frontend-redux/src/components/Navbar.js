import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';
import blogService from '../services/blogs';

const Navbar = () => {
   const dispatch = useDispatch();
   const {
      user: { currentUser: user },
   } = useSelector((state) => state);

   const handleLogout = () => {
      dispatch(setUser(null));
      window.localStorage.removeItem('loggedBlogAppUser');
      blogService.setToken(null);
   };

   return (
      <nav className='navbar'>
         <Link to='/users'>users</Link>
         <Link to='/'>blogs</Link>
         <span>{user.name || user.username} logged in</span>
         <button onClick={handleLogout}>logout</button>
      </nav>
   );
};

export default Navbar;
