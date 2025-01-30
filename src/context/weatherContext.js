import { createContext, useEffect, useState, useContext } from "react";
import {
  storeWeatherData,
  readWeatherData,
  resetWeatherData,
} from "../helpers/storage";
import { isWithinLast30Minutes } from "../helpers/time";
import { getPublicIP, getLocationFromIP } from "../helpers/location";
import FetchWeather from "../hooks/useFetchWeather";

export const WeatherContext = createContext();

export default function WeatherContextProvider({ children }) {
  const [weather, setWeather] = useState(undefined);
  // Fetch weather data only when the component mounts or when the weather data is outdated
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const previousWeatherData = await readWeatherData();
        if (
          previousWeatherData &&
          previousWeatherData.currentWeather &&
          !isWithinLast30Minutes(previousWeatherData.currentWeather.time)
        ) {
          console.log("Using previous weather data");
          setWeather(previousWeatherData);
        } else {
          console.log("Generating new data based on public IP address");
          const publicIP = await getPublicIP();
          const locationData = await getLocationFromIP(publicIP);
          if (locationData) {
            const { lat, lon, city, regionName, country } = locationData;
            const newWeatherData = await FetchWeather({
              lat,
              lon,
              name: city,
              display_name: `${city}, ${regionName}, ${country}`,
              address: {
                country,
              },
            });
            storeWeatherData(newWeatherData);
            console.log("Saved weather data into storage");
            setWeather(newWeatherData);
          } else {
            // Handle case where locationData is null (IP lookup failed)
            console.warn(
              "Could not get location from IP. Weather data might be unavailable."
            );
            setWeather(null); // Or set to a specific error state if needed
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null); // Set weather to null in case of any error
      }
    };
    fetchWeatherData();
  }, []);
  // Conditionally provide context values based on whether weather data is available
  const weatherContextValue = weather
    ? {
        currentWeather: weather.currentWeather,
        dailyWeather: weather.dailyWeather,
        weatherName: weather.name, // Added name to context
        setWeather,
      }
    : {
        currentWeather: null,
        dailyWeather: null,
        weatherName: null, // Added name to context
        setWeather,
      };
  return (
    <WeatherContext.Provider value={weatherContextValue}>
      {children}
    </WeatherContext.Provider>
  );
}
export function useWeather() {
  return useContext(WeatherContext);
}
