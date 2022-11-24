import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR_YEAR } from '../queries';

const UpdateAuthor = ({ setError, authors }) => {
   const [editAuthor] = useMutation(EDIT_AUTHOR_YEAR, {
      refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
      onError: (error) => {
         setError(error.graphQLErrors[0].message);
      },
   });
   const [name, setName] = useState('');
   const [born, setBorn] = useState('');

   const handleSubmit = (event) => {
      event.preventDefault();

      editAuthor({ variables: { name: name.trim(), born: Number(born) } });

      setBorn('');
   };

   return (
      <div>
         <h3>Set birth year</h3>
         <form onSubmit={handleSubmit}>
            {authors.length > 0 && (
               <select
                  name='name'
                  onChange={({ target }) => {
                     setName(target.value);
                  }}
               >
                  <option value='' defaultValue>
                     Select name
                  </option>
                  {authors.map((author) => {
                     return (
                        <option key={author.id} value={author.name}>
                           {author.name}
                        </option>
                     );
                  })}
               </select>
            )}
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
