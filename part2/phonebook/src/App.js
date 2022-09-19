import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
   const [persons, setPersons] = useState([]);
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

   useEffect(() => {
      axios.get('http://localhost:3001/persons').then((response) => {
         setPersons(response.data);
         setFilteredPersons(response.data);
      });
   }, []);

   return (
      <div>
         <h2>Phonebook</h2>
         <Filter search={search} handleFilter={handleFilter} />
         <h3>Add a new</h3>
         <PersonForm
            handleSubmit={handleSubmit}
            newName={newName}
            newNumber={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
         />
         <h2>Numbers</h2>
         <Persons persons={filteredPersons} />
      </div>
   );
};

export default App;