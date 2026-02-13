export default function LeftPanel({ city, weather }: { city: string, weather: any }) {
  const MET_BASE = "https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/";
  
  const getIcon = (vcIcon: string) => {
    // FIX: Guard against undefined/null values
    if (!vcIcon) return "cloudy";

    const icon = vcIcon.toLowerCase();
    if (icon.includes("thunder")) return "thunderstorm";
    if (icon.includes("snow")) return "snow";
    if (icon.includes("rain")) return "rain";
    if (icon.includes("cloudy")) return icon.includes("partly") ? "fair_day" : "cloudy";
    if (icon.includes("clear")) return icon.includes("night") ? "clearsky_night" : "clearsky_day";
    if (icon.includes("fog")) return "fog";
    return "cloudy";
  };

  // FIX: Absolute safety check for the weather object
  if (!weather) {
    return <div className="bento-info-display"><p>Loading weather...</p></div>;
  }

  return (
    <div className="bento-info-display">
      <p className="stat-label">{city}</p>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h1 style={{fontSize: '4rem', margin: '10px 0', fontWeight: '800'}}>
            {Math.round(weather.temp)}°
          </h1>
          <p style={{color: 'var(--text-secondary)', textTransform: 'capitalize'}}>
            {weather.condition}
          </p>
        </div>
        <img 
          /* Use weather.condition as a fallback if iconCode isn't explicitly mapped */
          src={`${MET_BASE}${getIcon(weather.iconCode || weather.condition)}.svg`} 
          style={{width: '100px', height: '100px'}} 
          alt="weather icon" 
          onError={(e) => { (e.target as HTMLImageElement).src = `${MET_BASE}cloudy.svg` }}
        />
      </div>
    </div>
  );
}