import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

export const LoginForm = ({ show, setError, setToken, setPage }) => {
   const [details, setDetails] = useState({
      username: '',
      password: '',
   });
   const { username, password } = details;

   const [login, result] = useMutation(LOGIN, {
      onError: (error) => {
         setError(error.graphQLErrors[0].message);
      },
   });

   const handleChange = (e) => {
      setDetails({ ...details, [e.target.name]: e.target.value });
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      login({ variables: { username, password } }).then(() => {
         setPage('authors');
      });
   };

   useEffect(() => {
      if (result.data) {
         const token = result.data.login.value;
         setToken(token);
         localStorage.setItem('library-user-token', token);
      }
   }, [result.data]); // eslint-disable-line

   if (!show) {
      return null;
   }

   return (
      <div>
         <form onSubmit={handleLogin}>
            <div>
               <label htmlFor='username'>name</label>
               <input
                  type='text'
                  name='username'
                  value={username}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label htmlFor='password'>password</label>
               <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
               />
            </div>
            <button type='submit'>login</button>
         </form>
      </div>
   );
};
