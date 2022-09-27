export default function SingleCountry({ country }) {
   return (
      <div>
         <h2>{country.name.common}</h2>
         <p>capital {country.capital[0]}</p>
         <p>area {country.area}</p>

         <h3>languages</h3>
         <ul>
            {Object.values(country.languages).map((language) => (
               <li>{language}</li>
            ))}
         </ul>

         <img src={country.flags.png} alt={country.name.common} />
      </div>
   );
}
