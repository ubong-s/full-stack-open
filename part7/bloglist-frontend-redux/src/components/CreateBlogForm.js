import { useState } from 'react';
import { createBlogAsync } from '../reducers/blogsReducer';

import { useDispatch } from 'react-redux';

const CreateBlogForm = () => {
   const dispatch = useDispatch();
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

   const addBlog = async (event) => {
      event.preventDefault();
      dispatch(createBlogAsync(newBlog));
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

            <button type='submit' id='create-blog'>
               create
            </button>
         </form>
      </div>
   );
};

export default CreateBlogForm;
