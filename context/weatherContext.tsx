import { createContext, useEffect, useState, useContext } from "react";
import { CurrentWeather, DaysForecast, HoursForecast, WeatherData } from "@/types/apiTypes";
import { EmptyWeatherObject } from "@/constants/weather";
import { fetchWeatherDataForContext } from "@/helpers/weather/data";

interface WeatherContextProps {
  name: string | null;
  timezone: string | null;
  currentWeather: CurrentWeather | null;
  dailyWeather: DaysForecast | null;
  hourlyWeather: HoursForecast | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>> | null;
}

export const WeatherContext = createContext<WeatherContextProps>(EmptyWeatherObject);

export default function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  useEffect(() => {
    const fetchWeatherData = async () => {
      await fetchWeatherDataForContext(setWeather);
    };
    fetchWeatherData();
  }, []);

  const weatherContextValue = weather
    ? {
        name: weather.name, // Added name to context
        currentWeather: weather.currentWeather,
        dailyWeather: weather.dailyWeather,
        hourlyWeather: weather.hourlyWeather,
        timezone: weather.timezone,
        setWeather,
      }
    : EmptyWeatherObject;
  return <WeatherContext.Provider value={weatherContextValue}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
