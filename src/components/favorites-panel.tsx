import { Unit } from "../config/types";
import type { FavoritesPanelProps } from "../config/types";

export default function FavoritesPanel({
  favorites,
  weatherMap,
  currentCity,
  onSelectCity,
  onToggleFavorite,
  unit,
}: FavoritesPanelProps) {
  const isFavorite = favorites.includes(currentCity);
  const tempSymbol = unit === Unit.Metric ? "°" : "°";

  return (
    <div className="bento-item favorites-tile">
      <div className="fav-header">
        <span className="stat-label">Favorites</span>
        <button
          className={`pin-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(currentCity)}
        >
          {isFavorite ? "📍 Pinned" : "📌 Pin City"}
        </button>
      </div>

      <div className="fav-list">
        {favorites.length === 0 && (
          <p className="fav-empty">No pinned cities</p>
        )}
        {favorites.map((city) => {
          const data = weatherMap[city];
          return (
            <div
              key={city}
              className={`fav-item ${city === currentCity ? "selected" : ""}`}
              onClick={() => onSelectCity(city)}
            >
              <div className="fav-city-info">
                <span className="fav-city-name">{city}</span>
                {data && (
                  <span className="fav-condition">{data.condition}</span>
                )}
              </div>
              {data && (
                <div className="fav-temp">
                  {Math.round(data.temp)}
                  {tempSymbol}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
