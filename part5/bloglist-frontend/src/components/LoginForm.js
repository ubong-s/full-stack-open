const LoginForm = ({ username, password, handleLoginChange, handleLogin }) => {
   return (
      <>
         <form onSubmit={handleLogin}>
            <div>
               <label htmlFor='username'>username</label>
               <input
                  type='text'
                  name='username'
                  id='username'
                  value={username}
                  onChange={handleLoginChange}
               />
            </div>
            <div>
               <label htmlFor='password'>password</label>
               <input
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={handleLoginChange}
               />
            </div>
            <button type='submit'>login</button>
         </form>
      </>
   );
};

export default LoginForm;
