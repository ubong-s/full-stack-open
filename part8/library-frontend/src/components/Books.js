import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
   const result = useQuery(ALL_BOOKS);
   const [genre, setGenre] = useState('');

   if (!props.show) {
      return null;
   }

   const books = result.data?.allBooks ? result.data.allBooks : [];

   const genres = [
      ...new Set(
         books
            .map((book) => {
               return book.genres;
            })
            .flat()
      ),
      'all genres',
   ];

   const filteredBooks = books.filter((book) => {
      if (genre === 'all genres') {
         return books;
      }

      return book.genres.find((g) => g === genre);
   });

   return (
      <>
         <div>
            <h2>books</h2>

            <table>
               <tbody>
                  <tr>
                     <th></th>
                     <th>author</th>
                     <th>published</th>
                  </tr>
                  {filteredBooks.map((a) => (
                     <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div>
            {genres.map((genre) => (
               <button key={genre} onClick={() => setGenre(genre)}>
                  {genre}
               </button>
            ))}
         </div>
      </>
   );
};

export default Books;
