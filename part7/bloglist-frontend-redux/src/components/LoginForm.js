import PropTypes from 'prop-types';
import { useState } from 'react';

const LoginForm = ({ loginUser }) => {
   const [loginDetails, setloginDetails] = useState({
      username: '',
      password: '',
   });

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setloginDetails({
         ...loginDetails,
         [name]: value,
      });
   };

   const handleLogin = (event) => {
      event.preventDefault();

      loginUser(loginDetails);

      setloginDetails({
         username: '',
         password: '',
      });
   };

   return (
      <>
         <form onSubmit={handleLogin}>
            <div>
               <label htmlFor='username'>username</label>
               <input
                  type='text'
                  name='username'
                  id='username'
                  value={loginDetails.username}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label htmlFor='password'>password</label>
               <input
                  type='password'
                  name='password'
                  id='password'
                  value={loginDetails.password}
                  onChange={handleChange}
               />
            </div>
            <button type='submit'>login</button>
         </form>
      </>
   );
};

LoginForm.propTypes = {
   loginUser: PropTypes.func.isRequired,
};

export default LoginForm;
