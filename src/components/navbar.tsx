import type {NavbarProps} from '../config/types';

export default function Navbar({ onSearch, onGoHome, searchQuery, setSearchQuery }: NavbarProps) {
  const formatCityName = (str: string): string => {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  return (
    <nav className="action-controls">
      <button onClick={onGoHome} className="home-nav-btn" title="Go to Home">🏠</button>
      <input 
        className="search-input-inline" 
        placeholder="search location..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchQuery.trim() !== "") {
            onSearch(formatCityName(searchQuery.trim()));
            setSearchQuery("");
          }
        }}
      />
    </nav>
  );
}