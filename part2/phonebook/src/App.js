import { useState } from 'react';

const App = () => {
   const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
   ]);
   const [filteredPersons, setFilteredPersons] = useState([...persons]);
   const [newName, setNewName] = useState('');
   const [newNumber, setNewNumber] = useState('');
   const [search, setSearch] = useState('');

   const generateId = () => Math.max(...persons.map((person) => person.id)) + 1;

   const handleSubmit = (e) => {
      e.preventDefault();

      const newPerson = { name: newName, number: newNumber, id: generateId() };

      const doesNameExists = persons.find(
         (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      );

      if (doesNameExists) {
         alert(`${newName} is already added to phonebook`);
      } else if (newName && newNumber) {
         setPersons(persons.concat(newPerson));
         setFilteredPersons(persons.concat(newPerson));
         setNewName('');
         setNewNumber('');
      }
   };

   const handleNameChange = (e) => {
      setNewName(e.target.value);
   };

   const handleNumberChange = (e) => {
      setNewNumber(e.target.value);
   };

   const handleFilter = (e) => {
      setSearch(e.target.value);

      const tempResults = persons.filter((person) =>
         person.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPersons(tempResults);
   };

   return (
      <div>
         <h2>Phonebook</h2>
         <div>
            Filter shown with <input value={search} onChange={handleFilter} />
         </div>
         <h3>Add a new</h3>
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
         {filteredPersons.map((person) => (
            <p key={person.id}>
               {person.name} {person.number}
            </p>
         ))}
      </div>
   );
};

export default App;
