import { createContext, useEffect, useState } from "react";
import { defaultWeather } from "../constants/weather";
import { readWeatherData, resetWeatherData } from "../helpers/asyncStorage";
import { isWithinLast30Minutes } from "../helpers/time";

export const WeatherContext = createContext();
export default function WeatherContextProvider({ children }) {
  const [weather, setWeather] = useState(defaultWeather);

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
        console.log("Using defaultWeather as fallback");
        setWeather(defaultWeather);
      }
    };
    funcc();
  }, []);
  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
