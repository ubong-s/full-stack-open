import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS_GENRE } from '../queries';

const Books = (props) => {
   const [genre, setGenre] = useState('');
   const result = useQuery(ALL_BOOKS_GENRE, {
      variables: { genre },
      skip: !genre,
   });

   const books = result.data?.allBooks ? result.data.allBooks : [];

   const filteredBooks = result.data?.booksByGenre
      ? result.data.booksByGenre
      : [];

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

   useEffect(() => {}, []);

   if (!props.show) {
      return null;
   }

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
                  {genre && genre !== 'all genres'
                     ? filteredBooks.map((a) => (
                          <tr key={a.title}>
                             <td>{a.title}</td>
                             <td>{a.author.name}</td>
                             <td>{a.published}</td>
                          </tr>
                       ))
                     : books.map((a) => (
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
