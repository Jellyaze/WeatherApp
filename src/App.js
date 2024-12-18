import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard.js';
import ForecastCard from './components/ForecastCard.js';
import MapComponent from './components/MapComponent.js';
import './App.css';
import cityData from './countries.json';

const App = () => {
  const [city, setCity] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [isMapMinimized, setMapMinimized] = useState(true); 

  const getWeather = async (selectedCity) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=332f720387eb7a4e1252ee58a164a6d9`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=332f720387eb7a4e1252ee58a164a6d9`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setError(null);
      setDropdownVisible(false);
      setCoordinates({ lat: weatherResponse.data.coord.lat, lon: weatherResponse.data.coord.lon });
    } catch (err) {
      setError('City not found');
      setWeather(null);
      setForecast(null);
      setCoordinates({ lat: null, lon: null });
    }
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setCity(userInput);

    if (userInput.length > 0) {
      const citiesArray = Object.entries(cityData).flatMap(([country, cities]) => [
        { name: country, type: 'country' },
        ...cities.map((city) => ({ name: city, type: 'city' }))
      ]);

      const filtered = citiesArray
        .filter(({ name }) => name.toLowerCase().includes(userInput.toLowerCase()))
        .slice(0, 5);

      setFilteredSuggestions(filtered);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const handleCitySelect = (cityName) => {
    setCity(cityName);
    setDropdownVisible(false);
    getWeather(cityName);
  };

  const handleLocationSelect = async (lat, lon) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=332f720387eb7a4e1252ee58a164a6d9`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=332f720387eb7a4e1252ee58a164a6d9`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setCoordinates({ lat, lon }); 
    } catch (err) {
      setError('Location not found');
      setWeather(null);
      setForecast(null);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lon: longitude });

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=332f720387eb7a4e1252ee58a164a6d9`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=332f720387eb7a4e1252ee58a164a6d9`
        );

        setWeather(weatherResponse.data);
        setForecast(forecastResponse.data);
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
      }
    );
  }, []);

  const getBackgroundClass = () => {
    if (!weather) return '';
    const weatherCondition = weather.weather[0].main.toLowerCase();

    if (weatherCondition.includes('thunderstorm')) return 'thunderstorm';
    if (weatherCondition.includes('rain')) return 'rainy';
    if (weatherCondition.includes('snow')) return 'snowy';
    if (weatherCondition.includes('mist')) return 'mist';
    if (weatherCondition.includes('clear') || weatherCondition.includes('sun')) return 'sunny';
    if (weatherCondition.includes('clouds')) return 'cloudy';
    return '';
  };

  const toggleMapMinimize = () => {
    setMapMinimized(!isMapMinimized);
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      {weather && weather.weather[0].main.toLowerCase().includes('rain') && <div className="rain"></div>}
      {weather && weather.weather[0].main.toLowerCase().includes('snow') && <div className="snow"></div>}
      
      <div className="header">
        <div className="search-container">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city or country"
            onFocus={() => setDropdownVisible(true)}
          />
          <button onClick={() => getWeather(city)}>Get Weather</button>

          {isDropdownVisible && filteredSuggestions.length > 0 && (
            <ul className="suggestions">
              {filteredSuggestions.map(({ name, type }, index) => (
                <li key={index} onClick={() => handleCitySelect(name)}>
                  {name} <span className={type === 'city' ? 'city-label' : 'country-label'}>
                    {type === 'city' ? '(City)' : '(Country)'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} userCoordinates={coordinates} />}
      {forecast && <ForecastCard forecast={forecast} />}

      {coordinates.lat && coordinates.lon && (
        <div className={`map-container ${isMapMinimized ? '' : 'map-expanded'}`}>
          <button className="minimize-button" onClick={toggleMapMinimize}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/3192/3192970.png"
              alt="Map Icon"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
          {!isMapMinimized && (
            <MapComponent lat={coordinates.lat} lon={coordinates.lon} onLocationSelect={handleLocationSelect} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
