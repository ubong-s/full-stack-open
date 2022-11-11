import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from '../components/User';
import { getAllUsersAsync } from '../reducers/userReducer';

const Users = () => {
   const dispatch = useDispatch();
   const users = useSelector(({ user: { allUsers } }) => {
      return [...allUsers].sort((a, b) => b.blogs.length - a.blogs.length);
   });

   useEffect(() => {
      dispatch(getAllUsersAsync());
   }, [dispatch]);

   return (
      <div>
         <h2>Users</h2>
         <div>
            <table>
               <thead>
                  <tr>
                     <th></th>
                     <th>blogs created</th>
                  </tr>
               </thead>

               <tbody>
                  {users.length > 0 &&
                     users.map((user) => <User key={user.id} user={user} />)}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Users;
