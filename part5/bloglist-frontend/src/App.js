import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
   const [blogs, setBlogs] = useState([]);
   const [loginDetails, setloginDetails] = useState({
      username: '',
      password: '',
   });
   const [errorMessage, setErrorMessage] = useState(null);

   const [user, setUser] = useState(null);

   useEffect(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
   }, []);

   const handleLogin = async (event) => {
      event.preventDefault();

      try {
         const user = await loginService.login(loginDetails);
         setUser(user);
         setloginDetails({
            username: '',
            password: '',
         });
      } catch (error) {
         setErrorMessage('Wrong credentials');
         setTimeout(() => {
            setErrorMessage(null);
         }, 5000);
      }
   };

   const handleLoginChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setloginDetails({
         ...loginDetails,
         [name]: value,
      });
   };

   return (
      <>
         <Notification message={errorMessage} />
         {!user && (
            <LoginForm
               username={loginDetails.username}
               password={loginDetails.password}
               handleLoginChange={handleLoginChange}
               handleLogin={handleLogin}
            />
         )}

         {user && <BlogList blogs={blogs} user={user} />}
      </>
   );
};

export default App;
