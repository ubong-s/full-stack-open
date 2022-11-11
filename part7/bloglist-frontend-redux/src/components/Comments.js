import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentAsync } from '../reducers/blogsReducer';

const Comments = ({ id, comments }) => {
   const [newComment, setNewComment] = useState('');
   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      e.preventDefault();

      const payload = { id, text: newComment };
      dispatch(addCommentAsync(payload));

      setNewComment('');
   };

   return (
      <>
         <h3>Comments</h3>

         <form onSubmit={handleSubmit}>
            <input
               type='text'
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
            />
            <button type='submit'>add comment</button>
         </form>
         <ul>
            {comments.map((comment) => (
               <li key={comment._id}>{comment.text}</li>
            ))}
         </ul>
      </>
   );
};

export default Comments;
