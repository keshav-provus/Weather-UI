import React from 'react';
import type {Props} from '../config/types';

const WeatherCard: React.FC<Props> = ({ weather }) => {
  if (!weather) return <div className="weather-card-loading">Loading...</div>;

  return (
    <div className="weather-glass-card">
      <div className="card-header">
        <div className="header-text">
          <h3 className="card-title">Current Weather</h3>
          <p className="card-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      <div className="card-main">
      
        <div className="temp-container">
          <h1 className="main-temp">{Math.round(weather.temp)}°C</h1>
          <p className="condition-label">{weather.condition}</p>
        </div>
      </div>

      <div className="card-stats">
        <div className="stat-item">
          <span className="stat-icon">≈</span>
          <span className="stat-value">{weather.humidity}%</span>
          <span className="stat-label">Humidity</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">༄</span>
          <span className="stat-value">{weather.windSpeed}km/h</span>
          <span className="stat-label">Wind</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">☼</span>
          <span className="stat-value">3</span>
          <span className="stat-label">UV Index</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;