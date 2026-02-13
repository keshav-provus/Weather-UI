import type { WeatherData } from '../types/types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeatherData(city: string): Promise<WeatherData | null> {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`;
        const res = await fetch(url);
        
        if (!res.ok) return null;
        
        const rawData = await res.json();
        const mappedData: WeatherData = {
            temp: rawData.currentConditions.temp,
            condition: rawData.currentConditions.conditions,
            humidity: rawData.currentConditions.humidity,
            pressure: rawData.currentConditions.pressure,
            sunrise: rawData.currentConditions.sunrise,
            sunset: rawData.currentConditions.sunset,
            dew: rawData.currentConditions.dew,
            windSpeed: rawData.currentConditions.windspeed,
            cloudcover: rawData.currentConditions.cloudcover,
            visibility: rawData.currentConditions.visibility,
            // Extracting the first 24 hours from the first day
            hours: rawData.days[0].hours.map((h: any) => ({
                datetime: h.datetime,
                temp: h.temp,
                condition: h.conditions,
                icon: h.icon
            }))
        };

        return mappedData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}