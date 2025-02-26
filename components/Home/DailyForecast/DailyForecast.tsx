import { useState, useEffect } from "react";
import { useWeather } from "@/context/weatherContext";
import { processDailyWeatherData } from "@/helpers/weather";
import { GlassyText, GlassyView } from "@/components/Glassy";
import Header from "./Header";
import DailyPrecipitation from "./DailyPrecipitation";
import DailyTemperature from "./DailyTemperature";
import ForecastList from "./NextDays/ForecastList";
import { DayWeather } from "@/types/apiTypes";
import { dailyForecastStyles } from "../styles";
import React from "react";
export default function DailyForecast() {
  const { dailyWeather } = useWeather();
  const [dailyForecast, setDailyForecast] = useState<DayWeather[] | null>(null);

  useEffect(() => {
    if (dailyWeather === null) return setDailyForecast(null);
    const processedData = processDailyWeatherData(dailyWeather.forecast);
    if (!processedData) return setDailyForecast(null);
    setDailyForecast(processedData);
  }, [dailyWeather]);

  let content = (
    <GlassyText style={dailyForecastStyles.text}>Loading weather forecast...</GlassyText>
  );
  if (dailyForecast) {
    content = (
      <>
        <Header />
        <ForecastList forecastData={dailyForecast} />
        <DailyPrecipitation forecastData={dailyForecast} />
        <DailyTemperature forecastData={dailyForecast} />
      </>
    );
  }
  // TODO: Make the graphs better
  // TODO: Add the words today and tomorrow
  return <GlassyView style={dailyForecastStyles.container}>{content}</GlassyView>;
}
