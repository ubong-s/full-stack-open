import { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserAsync } from '../reducers/userReducer';

const SingleUser = () => {
   const match = useMatch('/users/:id');
   const dispatch = useDispatch();
   const {
      user: { singleUser: user },
   } = useSelector((state) => state);

   useEffect(() => {
      dispatch(getSingleUserAsync(match.params.id));
   }, []);

   if (!user) {
      return null;
   }

   return (
      <div>
         <h2>{user.name}</h2>

         <h3>added blogs</h3>

         <ul>
            {user.blogs.map((blog) => (
               <li key={blog.id}>{blog.title}</li>
            ))}
         </ul>
      </div>
   );
};

export default SingleUser;
