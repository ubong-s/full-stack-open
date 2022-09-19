import { useState } from 'react';

const App = () => {
   const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
   const [newName, setNewName] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      const newPerson = { name: newName };

      const doesNameExists = persons.find(
         (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      );

      if (doesNameExists) {
         alert(`${newName} is already added to phonebook`);
      } else if (newName) {
         setPersons(persons.concat(newPerson));
         setNewName('');
      }
   };

   const handleChange = (e) => {
      setNewName(e.target.value);
   };

   return (
      <div>
         <h2>Phonebook</h2>
         <form onSubmit={handleSubmit}>
            <div>
               name: <input value={newName} onChange={handleChange} />
            </div>
            <div>
               <button type='submit'>add</button>
            </div>
         </form>
         <h2>Numbers</h2>
         {persons.map((person, i) => (
            <p key={i}>{person.name}</p>
         ))}
      </div>
   );
};

export default App;
