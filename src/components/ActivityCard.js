import React from 'react';
import '../css/WeatherCard.css'; 

const ActivityCard = ({ title, distance }) => {
  return (
    <div className="activity-card">
      <p>{title}</p>
      <p>{distance} away</p>
    </div>
  );
};

export default ActivityCard;
