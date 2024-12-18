import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ lat, lon }) => {
  return (
    <MapContainer center={[lat, lon]} zoom={8} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=332f720387eb7a4e1252ee58a164a6d9`}
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=332f720387eb7a4e1252ee58a164a6d9`}
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=332f720387eb7a4e1252ee58a164a6d9`}
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=332f720387eb7a4e1252ee58a164a6d9`}
      />
    </MapContainer>
  );
};

export default WeatherMap;
