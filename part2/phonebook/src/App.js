import { useState } from 'react';

const App = () => {
   const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
   const [newName, setNewName] = useState('');
   const [newNumber, setNewNumber] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      const newPerson = { name: newName, number: newNumber };

      const doesNameExists = persons.find(
         (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      );

      if (doesNameExists) {
         alert(`${newName} is already added to phonebook`);
      } else if (newName && newNumber) {
         setPersons(persons.concat(newPerson));
         setNewName('');
      }
   };

   const handleNameChange = (e) => {
      setNewName(e.target.value);
   };

   const handleNumberChange = (e) => {
      setNewNumber(e.target.value);
   };

   return (
      <div>
         <h2>Phonebook</h2>
         <form onSubmit={handleSubmit}>
            <div>
               name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
               number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
               <button type='submit'>add</button>
            </div>
         </form>
         <h2>Numbers</h2>
         {persons.map((person, i) => (
            <p key={i}>
               {person.name} {person.number}
            </p>
         ))}
      </div>
   );
};

export default App;
