import { useState, useEffect } from "react";
import { useWeather } from "../../../context/weatherContext";
import { processDailyWeatherData } from "../../../helpers/weather";
import { GlassyText, GlassyView } from "../../Glassy";
import Header from "./Header";
import DailyPrecipitation from "./DailyPrecipitation";
import DailyTemperature from "./DailyTemperature";
import ForecastList from "./NextDays/ForecastList";
import { DayWeather } from "../../../types/apiTypes";

export default function DailyForecast() {
  const { dailyWeather } = useWeather();
  const [dailyForecast, setDailyForecast] = useState<DayWeather[] | null>(null);
  useEffect(() => {
    if (dailyWeather === null) {
      setDailyForecast(null);
      return;
    }
    if (!dailyWeather.forecast) {
      // Check for forecast property specifically
      setDailyForecast(null);
      return;
    }
    try {
      if (!dailyWeather.forecast || typeof dailyWeather.forecast !== "object") {
        // More robust check
        console.error(
          "Error: dailyWeather.forecast is not a valid object:",
          dailyWeather.forecast
        );
        setDailyForecast(null);
        return; // Exit the useEffect if it's invalid
      }
      const processedData = processDailyWeatherData(dailyWeather.forecast);
      if (processedData) {
        // Check if processDailyWeatherData returns a valid result
        setDailyForecast(processedData);
      } else {
        console.error("processDailyWeatherData returned null or undefined.");
        setDailyForecast(null); // Set to empty array in case of processing error
      }
    } catch (error) {
      console.error("Error processing weather data:", error);
      setDailyForecast(null);
    }
  }, [dailyWeather]);

  if (dailyForecast === null) {
    return (
      <GlassyView style={{ margin: 8, flexDirection: "column", width: "91%" }}>
        <GlassyText
          style={{ fontSize: 24, lineHeight: 32, paddingVertical: 32 }}
        >
          Loading weather forecast...
        </GlassyText>
      </GlassyView>
    );
  }
  // TODO: Improve chart theming
  // TODO: Add the words today and tomorrow
  return (
    <GlassyView
      style={{
        margin: 8,
        flexDirection: "column",
        width: "91%",
        alignSelf: "center",
      }}
    >
      <Header />
      <ForecastList forecastData={dailyForecast} />
      <DailyPrecipitation />
      <DailyTemperature />
    </GlassyView>
  );
}
