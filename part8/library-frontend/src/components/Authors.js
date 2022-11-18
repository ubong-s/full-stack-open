import { gql, useQuery } from '@apollo/client';

const ALL_AUTHORS = gql`
   query Authors {
      allAuthors {
         id
         name
         born
         bookCount
      }
   }
`;

const Authors = (props) => {
   const result = useQuery(ALL_AUTHORS);
   if (!props.show) {
      return null;
   }

   const authors = result.data?.allAuthors ? result.data.allAuthors : [];

   return (
      <div>
         <h2>authors</h2>
         <table>
            <tbody>
               <tr>
                  <th></th>
                  <th>born</th>
                  <th>books</th>
               </tr>
               {authors.map((a) => (
                  <tr key={a.name}>
                     <td>{a.name}</td>
                     <td>{a.born}</td>
                     <td>{a.bookCount}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Authors;