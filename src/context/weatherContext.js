import { createContext, useEffect, useState } from "react";
import { defaultWeather } from "../constants/weather";
import { readWeatherData, resetWeatherData } from "../helpers/asyncStorage";
import { isWithinLast30Minutes } from "../helpers/time";
import getPublicIP from "../helpers/getPublicIP";
import getLocationFromIP from "../helpers/getLocationFromIP";
import FetchWeather from "../hooks/useFetchWeather";

export const WeatherContext = createContext();
export default function WeatherContextProvider({ children }) {
  const [weather, setWeather] = useState(defaultWeather);
  // Fetch weather data only when the component mounts or when the weather data is outdated
  useEffect(() => {
    const funcc = async () => {
      const previousWeatherData = await readWeatherData();
      if (
        previousWeatherData &&
        !isWithinLast30Minutes(previousWeatherData.current.time)
      ) {
        console.log("Using previous weather data");
        setWeather(previousWeatherData);
      } else {
        // Using defaultWeather as a fallback
        console.log("Generating new data based on public IP address");
        const { lat, lon, city, regionName, country } = await getLocationFromIP(
          await getPublicIP()
        );
        const newWeatherData = await FetchWeather({
          lat,
          lon,
          name: city,
          display_name: `${city}, ${regionName}, ${country}`,
          address: {
            country,
          },
        });
        setWeather(newWeatherData);
      }
    };
    funcc();
  }, []);
  if (weather.current) {
    return (
      <WeatherContext.Provider
        value={{
          temp: weather.current.temperature_2m
            ? Math.round(weather.current.temperature_2m)
            : "",
          tempUnit: weather.current_units.temperature_2m,
          weatherCode: weather.current.weather_code,
          humidity: weather.current.relative_humidity_2m,
          windSpeed: weather.current.wind_speed_10m,
          windUnit: weather.current_units.wind_speed_10m,
          currentTime: weather.current.time,
          weather,
          setWeather,
        }}
      >
        {children}
      </WeatherContext.Provider>
    );
  } else {
    return (
      <WeatherContext.Provider
        value={{
          temp: "N/A",
          tempUnit: "",
          weatherCode: 0,
          humidity: "Unavailable",
          windSpeed: "Unavailable",
          windUnit: "Unavailable",
          currentTime: "Unavailable",
          weather: "Unavailable",
          setWeather,
        }}
      >
        {children}
      </WeatherContext.Provider>
    );
  }
}
