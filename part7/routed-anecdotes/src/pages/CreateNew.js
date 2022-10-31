import { useField } from '../hooks';

export const CreateNew = (props) => {
   const content = useField('text');
   const author = useField('text');
   const info = useField('text');

   const { reset: resetContent, ...contentParams } = content;
   const { reset: resetAuthor, ...authorParams } = author;
   const { reset: resetInfo, ...infoParams } = info;

   const handleSubmit = (e) => {
      e.preventDefault();
      props.addNew({
         content: content.value,
         author: author.value,
         info: info.value,
         votes: 0,
      });
   };

   const resetForm = () => {
      content.resetContent();
      author.resetAuthor();
      info.resetInfo();
   };

   return (
      <div>
         <h2>create a new anecdote</h2>
         <form onSubmit={handleSubmit}>
            <div>
               content
               <input name='content' {...contentParams} />
            </div>
            <div>
               author
               <input name='author' {...authorParams} />
            </div>
            <div>
               url for more info
               <input name='info' {...infoParams} />
            </div>
            <button type='submit'>create</button>
            <button type='reset' onClick={resetForm}>
               reset
            </button>
         </form>
      </div>
   );
};
