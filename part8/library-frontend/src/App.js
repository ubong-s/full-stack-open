import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import { LoginForm } from './components/LoginForm';
import NewBook from './components/NewBook';
import Notification from './components/Notification';

const App = () => {
   const [page, setPage] = useState('authors');
   const [errorMessage, setErrorMessage] = useState('');
   const [token, setToken] = useState(null);

   const client = useApolloClient();

   const notify = (message) => {
      setErrorMessage(message);
      setTimeout(() => {
         setErrorMessage(null);
      }, 10000);
   };

   const logout = () => {
      setToken(null);
      localStorage.clear();
      client.resetStore();
   };

   useEffect(() => {
      const storageToken = localStorage.getItem('library-user-token');
      if (storageToken) {
         setToken(storageToken);
      }
   }, []);

   return (
      <div>
         <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            {token ? (
               <>
                  <button onClick={() => setPage('add')}>add book</button>
                  <button onClick={logout}>logout</button>
               </>
            ) : (
               <button onClick={() => setPage('login')}>login</button>
            )}
         </div>
         <Notification message={errorMessage} />
         <Authors show={page === 'authors'} setError={notify} />

         <Books show={page === 'books'} />

         <NewBook show={page === 'add'} setError={notify} setPage={setPage} />
         <LoginForm
            show={page === 'login'}
            setError={notify}
            setToken={setToken}
            setPage={setPage}
         />
      </div>
   );
};

export default App;
