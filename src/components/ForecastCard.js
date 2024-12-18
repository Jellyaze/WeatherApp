import React from 'react';
import '../css/ForecastCard.css';

const ForecastCard = ({ forecast }) => {
  const getDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const dailyForecasts = forecast.list.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const averagedDailyForecasts = Object.keys(dailyForecasts).map((date) => {
    const dayData = dailyForecasts[date];
    const tempSum = dayData.reduce((sum, entry) => sum + entry.main.temp, 0);
    const avgTemp = tempSum / dayData.length;
    const { weather } = dayData[0];
    return {
      date,
      avgTemp,
      weather,
    };
  }).slice(0, 5);

  return (
    <div className="forecast-container">
      {averagedDailyForecasts.map((day, index) => (
        <div key={index} className="forecast-card">
          <h3>{getDay(new Date(day.date).getTime() / 1000)}</h3>
          <div className="forecast-icon">
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" />
          </div>
          <div className="forecast-info">
            <p>{Math.round(day.avgTemp - 273.15)}°C</p> {/* Convert from Kelvin to Celsius */}
            <p className="description">{day.weather[0].description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;
