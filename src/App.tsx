import { useState, useEffect } from "react";
import "./style.css";
import LeftPanel from "./components/left-panel";
import MapComponent from "./components/map-component";
import HourlyForecast from "./components/hourly-forecast";
import Navbar from "./components/navbar";
import ChatPanel from "./components/climate-assisstant";
import { GridCell } from "./components/grid-cell";
import { fetchWeatherData } from "./api/weatherService";
import { fetchLocation } from "./api/getLocation";

export default function App() {
  // Start with an empty or null city to prevent the immediate "Jaipur" call
  const [currentCity, setCurrentCity] = useState<string>("");
  const [homeCity, setHomeCity] = useState<string>("Jaipur");
  const [weather, setWeather] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const formatCityName = (str: string) => {
    if (!str) return "";
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Step 1: Get location once on mount
  useEffect(() => {
    fetchLocation().then(city => { 
      const targetCity = city ? formatCityName(city) : "Jaipur";
      setCurrentCity(targetCity); 
      setHomeCity(targetCity); 
    });
  }, []);

  // Step 2: Only fetch weather if currentCity is set
  useEffect(() => {
    if (!currentCity) return; // Stop the extra initial call

    const updateWeather = async () => {
      const data = await fetchWeatherData(currentCity);
      if (data) {
        setWeather(data);
      } else {
        alert(`Error: "${currentCity}" unknown. Reverting...`);
        setCurrentCity(homeCity);
      }
    };
    
    updateWeather();
  }, [currentCity]); // Removed homeCity from dependency to avoid unnecessary triggers

  return (
    <div className="main-wrapper">
      <Navbar 
        onSearch={(city) => setCurrentCity(formatCityName(city))} 
        onGoHome={() => setCurrentCity(homeCity)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="bento-dashboard">
        <div className="bento-item weather-main">
          {weather && <LeftPanel key={currentCity} city={currentCity} weather={weather} />}
        </div>

        <ChatPanel city={currentCity} weather={weather} />

        <div className="bento-item map-tile">
          <MapComponent city={currentCity} />
        </div>

        <GridCell label="Atmosphere" value={weather?.pressure} sub="hPa" />
        
        <GridCell 
          label="Humidity" 
          value={`${Math.round(weather?.humidity || 0)}%`} 
          sub={`Dew: ${Math.round(weather?.dew || 0)}°`} 
        />

        <GridCell label="Sun Times">
          <div className="sun-times-grid">
            <div className="sun-row">
              <span className="sun-icon">🌅</span>
              <span className="sun-text">{weather?.sunrise?.slice(0, 5)}</span>
            </div>
            <div className="sun-row">
              <span className="sun-icon">🌇</span>
              <span className="sun-text">{weather?.sunset?.slice(0, 5)}</span>
            </div>
          </div>
        </GridCell>

        <GridCell 
          label="Cloud Cover" 
          value={`${Math.round(weather?.cloudcover || 0)}%`} 
          sub={`Visibility: ${weather?.visibility} km`} 
        />

        <div className="bento-item hourly-tile">
          {weather && <HourlyForecast hourly={weather.hours} />}
        </div>
      </main>
    </div>
  );
}