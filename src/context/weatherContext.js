import { createContext, useEffect, useState } from "react";
import { defaultWeather } from "../constants/weather";
import { readWeatherData, resetWeatherData } from "../helpers/asyncStorage";
import { isWithinLast30Minutes } from "../helpers/time";
import getPublicIP from "../helpers/getPublicIP";
import getLocationFromIP from "../helpers/getLocationFromIP";
import FetchWeather from "../hooks/useFetchWeather";

export const WeatherContext = createContext();


export default function WeatherContextProvider({ children }) {
  const [weather, setWeather] = useState(undefined);
  // Fetch weather data only when the component mounts or when the weather data is outdated
  useEffect(() => {
    const fetchWeatherData = async () => {
      resetWeatherData();
      try {
        const previousWeatherData = await readWeatherData();
        if (
          previousWeatherData &&
          previousWeatherData.currentWeather && // Check if previousWeatherData.current exists
          !isWithinLast30Minutes(previousWeatherData.currentWeather.time)
        ) {
          console.log("Using previous weather data");
          setWeather(previousWeatherData);
        } else {
          // Using defaultWeather as a fallback
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
            setWeather(newWeatherData);
          } else {
            // Handle case where locationData is null (IP lookup failed)
            console.warn("Could not get location from IP. Weather data might be unavailable.");
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
