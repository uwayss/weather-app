import { useState, useEffect } from "react";
import { useWeather } from "@/context/weatherContext";
import { GlassyText, GlassyView } from "@/components/Glassy";
import Header from "./Header";
import DailyPrecipitation from "./DailyPrecipitation";
import DailyTemperature from "./DailyTemperature";
import ForecastList from "./NextDays/ForecastList";
import { DayWeather } from "@/types/apiTypes";
import { dailyForecastStyles, headerStyles } from "../styles";
import { processDailyWeatherData } from "@/helpers/weather/data";
import React from "react";
import { ActivityIndicator, View } from "react-native";

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
    <View style={[headerStyles.container, { flexDirection: "column", minWidth: "100%" }]}>
      <ActivityIndicator size="large" color="#fff" />
      <GlassyText style={headerStyles.title}>Loading forecast...</GlassyText>
    </View>
  );

  if (dailyForecast) {
    content = (
      <>
        <Header />
        <ForecastList forecastData={dailyForecast} />
        <GlassyView style={{ marginTop: 16, maxWidth: "100%" }} isTransparent>
          {/* <DailyPrecipitation forecastData={dailyForecast} />
          <DailyTemperature forecastData={dailyForecast} /> */}
          <GlassyText>Bro Please Implement Better Graphs</GlassyText>
        </GlassyView>
      </>
    );
  }

  return (
    <GlassyView
      style={[
        dailyForecastStyles.container,
        !dailyForecast && { alignItems: "center", justifyContent: "center" },
      ]}
      isAnimated
    >
      {content}
    </GlassyView>
  );
}
