

import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: '332f720387eb7a4e1252ee58a164a6d9'
        }
      });
      setWeather(response.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        
        setError(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        
        setError('Error: No response from server');
      } else {
        
        setError(`Error: ${err.message}`);
      }
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city" 
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{(weather.main.temp - 273.15).toFixed(2)}°C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
