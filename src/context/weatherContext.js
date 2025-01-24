import { createContext, useState } from "react";
export const WeatherContext = createContext();
import { defaultWeather } from "../constants/weather";

export default function WeatherContextProvider({ children }) {
  const [weather, setWeather] = useState(defaultWeather);
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
