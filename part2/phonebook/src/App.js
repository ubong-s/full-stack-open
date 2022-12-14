import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebook';

const App = () => {
   const [persons, setPersons] = useState([]);
   const [filteredPersons, setFilteredPersons] = useState([...persons]);
   const [newName, setNewName] = useState('');
   const [newNumber, setNewNumber] = useState('');
   const [search, setSearch] = useState('');
   const [message, setMessage] = useState({ type: '', text: '' });

   const addPerson = (e) => {
      e.preventDefault();

      const newPerson = {
         name: newName,
         number: newNumber,
      };

      const doesNameExists = persons.find(
         (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      );

      if (doesNameExists && newNumber) {
         if (
            window.confirm(
               `${newName} is already added to phonebook, replace the old number with a new one?`
            )
         ) {
            phonebookService
               .update(doesNameExists.id, newPerson)
               .then((returnedPerson) => {
                  setPersons((prev) =>
                     prev.map((person) =>
                        person.id === returnedPerson.id
                           ? returnedPerson
                           : person
                     )
                  );
                  setFilteredPersons((prev) =>
                     prev.map((person) =>
                        person.id === returnedPerson.id
                           ? returnedPerson
                           : person
                     )
                  );
                  setMessage({
                     type: 'success',
                     text: `Updated ${returnedPerson.name}`,
                  });
                  setNewName('');
                  setNewNumber('');
               })
               .catch((error) => {
                  setMessage({
                     type: 'error',
                     text: error.response.data.error,
                  });
               });
         }
      } else {
         phonebookService
            .create(newPerson)
            .then((returnedPerson) => {
               setPersons(persons.concat(returnedPerson));
               setFilteredPersons(persons.concat(returnedPerson));
               setMessage({
                  type: 'success',
                  text: `Added ${returnedPerson.name}`,
               });
               setNewName('');
               setNewNumber('');
            })
            .catch((error) => {
               setMessage({
                  type: 'error',
                  text: error.response.data.error,
               });
            });
      }
   };

   const deletePerson = (id) => {
      const tempPerson = persons.find((person) => person.id === id);
      if (window.confirm(`Delete ${tempPerson.name}`)) {
         phonebookService.remove(id).then(() => {
            setPersons((prev) => prev.filter((p) => p.id !== tempPerson.id));
            setFilteredPersons((prev) =>
               prev.filter((p) => p.id !== tempPerson.id)
            );
         });
      }
   };

   const handleChange = (e) => {
      if (e.target.name === 'name') {
         setNewName(e.target.value);
      }

      if (e.target.name === 'number') {
         setNewNumber(e.target.value);
      }
   };

   const handleFilter = (e) => {
      setSearch(e.target.value);

      const tempResults = persons.filter((person) =>
         person.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPersons(tempResults);
   };

   useEffect(() => {
      phonebookService.getAll().then((persons) => {
         setPersons(persons);
         setFilteredPersons(persons);
      });
   }, []);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setMessage({ type: '', text: '' });
      }, 6000);

      return () => {
         clearTimeout(timeout);
      };
   }, [message.text]);

   return (
      <div>
         <h2>Phonebook</h2>
         <Notification message={message} />
         <Filter search={search} handleFilter={handleFilter} />
         <h3>Add a new</h3>
         <PersonForm
            handleSubmit={addPerson}
            newName={newName}
            newNumber={newNumber}
            handleChange={handleChange}
         />
         <h2>Numbers</h2>
         <Persons persons={filteredPersons} deletePerson={deletePerson} />
      </div>
   );
};

export default App;
