import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
   const [blogs, setBlogs] = useState([]);
   const [loginDetails, setloginDetails] = useState({
      username: '',
      password: '',
   });

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
      } catch (error) {}
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
