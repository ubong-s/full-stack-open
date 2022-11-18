import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR_YEAR } from '../queries';

const UpdateAuthor = (props) => {
   const [editAuthor] = useMutation(EDIT_AUTHOR_YEAR, {
      refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
   });
   const [name, setName] = useState('');
   const [born, setBorn] = useState('');

   const handleSubmit = (event) => {
      event.preventDefault();

      editAuthor({ variables: { name: name.trim(), born: Number(born) } });

      setName('');
      setBorn('');
   };

   if (!props.show) {
      return null;
   }

   return (
      <div>
         <h3>Set birth year</h3>
         <form onSubmit={handleSubmit}>
            <div>
               <input
                  type='text'
                  value={name}
                  onChange={({ target }) => {
                     setName(target.value);
                  }}
               />
            </div>
            <div>
               <input
                  type='number'
                  value={born}
                  onChange={({ target }) => {
                     setBorn(target.value);
                  }}
               />
            </div>
            <button type='submit'>Update Author</button>
         </form>
      </div>
   );
};

export default UpdateAuthor;
