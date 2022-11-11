import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../reducers/userReducer';
import blogService from '../services/blogs';

const Navbar = () => {
   const navStyles = {
      display: 'flex',
      alignItem: 'center',
      gap: '0.25rem',
      backgroundColor: '#D3D3D3',
      padding: '0.25rem',
   };

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
      <span style={navStyles}>
         <Link to='/users'>users</Link>
         <Link to='/'>blogs</Link>
         <span>{user.name || user.username} logged in</span>
         <button onClick={handleLogout}>logout</button>
      </span>
   );
};

export default Navbar;
