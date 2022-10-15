import { useState } from 'react';

const CreateBlogForm = ({ handleBlogChange, blog, createBlog }) => {
   return (
      <div>
         <h2>Create new</h2>

         <form onSubmit={createBlog}>
            <div>
               <label htmlFor='title'>title:</label>
               <input
                  type='text'
                  name='title'
                  id='title'
                  value={blog.title}
                  onChange={handleBlogChange}
               />
            </div>
            <div>
               <label htmlFor='author'>author:</label>
               <input
                  type='text'
                  name='author'
                  id='author'
                  value={blog.author}
                  onChange={handleBlogChange}
               />
            </div>
            <div>
               <label htmlFor='url'>url:</label>
               <input
                  type='text'
                  name='url'
                  id='url'
                  value={blog.url}
                  onChange={handleBlogChange}
               />
            </div>

            <button type='submit'>create</button>
         </form>
      </div>
   );
};

export default CreateBlogForm;
