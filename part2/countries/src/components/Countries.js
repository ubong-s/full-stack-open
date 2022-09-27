export default function Countries({ countries }) {
   return (
      <div>
         {countries.map((country) => (
            <div key={country.name.official}>{country.name.common}</div>
         ))}
      </div>
   );
}
