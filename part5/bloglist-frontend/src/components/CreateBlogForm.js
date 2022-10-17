import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateBlogForm = ({ createBlog }) => {
   const [newBlog, setNewBlog] = useState({
      title: '',
      author: '',
      url: '',
   });

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setNewBlog({
         ...newBlog,
         [name]: value,
      });
   };

   const addBlog = (event) => {
      event.preventDefault();

      createBlog(newBlog);

      setNewBlog({
         title: '',
         author: '',
         url: '',
      });
   };

   return (
      <div>
         <h2>Create new</h2>

         <form onSubmit={addBlog}>
            <div>
               <label htmlFor='title'>title:</label>
               <input
                  type='text'
                  name='title'
                  id='title'
                  value={newBlog.title}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label htmlFor='author'>author:</label>
               <input
                  type='text'
                  name='author'
                  id='author'
                  value={newBlog.author}
                  onChange={handleChange}
               />
            </div>
            <div>
               <label htmlFor='url'>url:</label>
               <input
                  type='text'
                  name='url'
                  id='url'
                  value={newBlog.url}
                  onChange={handleChange}
               />
            </div>

            <button type='submit'>create</button>
         </form>
      </div>
   );
};

CreateBlogForm.propTypes = {
   createBlog: PropTypes.func.isRequired,
};

export default CreateBlogForm;
