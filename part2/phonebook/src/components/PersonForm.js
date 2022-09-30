const PersonForm = ({ handleSubmit, newName, newNumber, handleChange }) => {
   return (
      <form onSubmit={handleSubmit}>
         <div>
            name: <input name='name' value={newName} onChange={handleChange} />
         </div>
         <div>
            number:{' '}
            <input name='number' value={newNumber} onChange={handleChange} />
         </div>
         <div>
            <button type='submit'>add</button>
         </div>
      </form>
   );
};

export default PersonForm;
