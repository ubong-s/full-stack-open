import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
   const anecdotes = useSelector(({ filter, anecdotes }) => {
      if (!filter) {
         return anecdotes;
      }

      return anecdotes.filter((anecdote) =>
         anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
   });
   const dispatch = useDispatch();

   return (
      <div>
         {[...anecdotes]
            .sort((a, b) => b.votes - a.votes)
            .map((anecdote) => (
               <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                     has {anecdote.votes}
                     <button
                        onClick={() => {
                           dispatch(voteAnecdote(anecdote));
                           dispatch(
                              setMessage(`you voted '${anecdote.content}'`)
                           );
                        }}
                     >
                        vote
                     </button>
                  </div>
               </div>
            ))}
      </div>
   );
};

export default AnecdoteList;
