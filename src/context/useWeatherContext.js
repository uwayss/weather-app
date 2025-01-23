import { createContext, useState } from "react";

export const WeatherContext = createContext();
export default function WeatherContextProvider({ children }) {
  const [weather, setWeather] = useState({
    location: "New York",
    country: "USA",
    condition: "Sunny",
    temp: 20,
    humidity: 60,
    windSpeed: 5,
    time: "15:05",
  });
  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}
