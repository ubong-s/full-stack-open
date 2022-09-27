import { useState, useEffect } from 'react';
import Countries from './components/Countries';
import Search from './components/Search';
import SingleCountry from './components/SingleCountry';

const App = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [countries, setCountries] = useState([]);
   const [filteredCountries, setFilteredCountries] = useState([]);

   const fetchCountries = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();

      setCountries(data);
   };

   const handleSearchQuery = (e) => {
      setSearchQuery(e.target.value);

      const tempCountries = countries.filter((country) =>
         country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredCountries(tempCountries);
   };

   console.log('countries', countries);

   useEffect(() => {
      fetchCountries();
   }, []);

   return (
      <>
         <Search
            searchQuery={searchQuery}
            handleSearchQuery={handleSearchQuery}
         />

         {searchQuery && filteredCountries.length > 10 ? (
            <div>Too many matches. Specify another filter</div>
         ) : filteredCountries.length === 1 ? (
            <SingleCountry country={filteredCountries[0]} />
         ) : (
            searchQuery && <Countries countries={filteredCountries} />
         )}
      </>
   );
};

export default App;
