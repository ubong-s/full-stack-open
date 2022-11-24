import { useQuery } from '@apollo/client';
import { RECOMMENDED } from '../queries';

export const Recommended = ({ show, setError }) => {
   const { data } = useQuery(RECOMMENDED, {
      onError: (error) => {
         setError('Error fetching data');
      },
   });

   if (!show) {
      return null;
   }

   if (!data) {
      return null;
   }

   const recommended = data.recommended ? data.recommended : [];
   const user = data.me ? data.me : '';

   return (
      <div>
         <h2>recommendations</h2>
         <p>
            books in your favourite genre <strong>{user.favouriteGenre}</strong>{' '}
         </p>
         <table>
            <tbody>
               <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
               </tr>
               {recommended.map((a) => (
                  <tr key={a.title}>
                     <td>{a.title}</td>
                     <td>{a.author.name}</td>
                     <td>{a.published}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
