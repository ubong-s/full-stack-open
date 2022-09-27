import SingleCountryWeather from './SingleCountryWeather';

export default function SingleCountry({ country }) {
   console.log('capital', country.capital[0]);

   return (
      <div>
         <h1>{country.name.common}</h1>
         <p>capital {country.capital[0]}</p>
         <p>area {country.area}</p>

         <h3>languages</h3>
         <ul>
            {Object.values(country.languages).map((language) => (
               <li key={language}>{language}</li>
            ))}
         </ul>

         <img src={country.flags.png} alt={country.name.common} />
         <SingleCountryWeather capital={country.capital[0]} />
      </div>
   );
}
