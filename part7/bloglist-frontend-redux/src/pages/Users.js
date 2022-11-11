import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from '../components/User';
import { getAllUsersAsync } from '../reducers/userReducer';

const Users = () => {
   const dispatch = useDispatch();
   const {
      user: { allUsers },
   } = useSelector((state) => state);

   console.log(allUsers);

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
                  {allUsers.length > 0 &&
                     allUsers.map((user) => <User key={user.id} user={user} />)}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Users;
