export interface HourlyData {
  datetime: string;
  temp: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  dew: number;
  windSpeed: number;
  cloudcover: number;
  visibility: number;
  hours: HourlyData[]; 
}

export interface Props {
  city: string;
  weather: WeatherData | null;
}

export interface NavbarProps {
  onSearch: (city: string) => void;
  onGoHome: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export interface GridCellProps {
  label: string;
  value?: string | number;
  sub?: string;
  children?: React.ReactNode;
}

//             temp: day.temp,
//             condition: day.conditions,
//             iconCode: day.icon,
//             humidity: day.humidity,
//             windSpeed: day.windspeed,
//             pressure: day.pressure,
//             sunrise: day.sunrise,
//             sunset: day.sunset,
//             dew: day.dew,
//             cloudcover: day.cloudcover,
//             hours: day.hours 
