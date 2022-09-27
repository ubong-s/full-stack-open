export default function Countries({ countries, setFilteredCountries }) {
   return (
      <div>
         {countries.map((country) => (
            <div key={country.name.official}>
               {country.name.common}
               <button onClick={() => setFilteredCountries([country])}>
                  show
               </button>
            </div>
         ))}
      </div>
   );
}
