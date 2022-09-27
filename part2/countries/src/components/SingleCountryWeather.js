import { useState, useEffect } from 'react';

export default function SingleCountryWeather({ capital }) {
   const [weatherData, setWeatherData] = useState({});

   console.log('env', process.env.REACT_APP_OPEN_WEATHER_API_KEY);

   const fetchWeatherData = async () => {
      const res = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      );
      const data = await res.json();

      setWeatherData(data);
   };

   useEffect(() => {
      fetchWeatherData();
   }, []);

   return (
      <div>
         <h2>Weather in {capital}</h2>
         <p>temperature {weatherData.main?.temp} Celcius</p>
         <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
            alt={weatherData.weather[0]?.main}
         />
         <p>wind {weatherData.wind?.speed} m/s </p>
      </div>
   );
}
