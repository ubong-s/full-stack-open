import axios from 'axios';
import { useState, useEffect } from 'react';

export const useField = (type) => {
   const [value, setValue] = useState('');

   const onChange = (event) => {
      setValue(event.target.value);
   };

   return {
      type,
      value,
      onChange,
   };
};

export const useCountry = (name) => {
   const [country, setCountry] = useState(null);

   const fetchCountry = async () => {
      try {
         if (name) {
            const response = await axios.get(
               `https://restcountries.com/v3.1/name/${name}?fullText=true`
            );

            setCountry(response.data[0]);
         } else {
            setCountry(null);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchCountry();
   }, [name]);

   return country;
};
