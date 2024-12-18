// WeatherCard.js
import React from 'react';
import '../css/WeatherCard.css'; 

const WeatherCard = ({ weather, userCoordinates }) => {
  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
  
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

  const backgroundClass = getBackgroundClass();

  return (
    <div className={`weather-card ${backgroundClass}`}>
      <div className="weather-header">
        <h2>{weather.name}</h2>
        <p className="temperature">{kelvinToCelsius(weather.main.temp)}°C</p>
      </div>
      <div className="weather-body">
        <div className="weather-icon">
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        </div>
        <div className="weather-info">
          <p className="description">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
