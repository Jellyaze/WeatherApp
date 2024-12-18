import React from 'react';
import '../App.css';

const MapComponent = ({ lat = 0, lon = 0 }) => {
  
  const windyMapUrl = `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=°C&metricWind=m/s&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${lon}&detailLat=${lat + 3}&detailLon=${lon + 3}&detail=true&message=true`;

  return (
    <div
      className="map-container"
      style={{
        height: '600px', 
        width: '100%',    
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <iframe
        width="100%"
        height="100%" 
        src={windyMapUrl}
        frameBorder="0"
        style={{ border: 'none' }}
        title="Windy Map"
      ></iframe>
    </div>
  );
};

export default MapComponent;
