import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../../context/weatherContext";
import { View, FlatList } from "react-native";
import { processDailyWeatherData } from "../../../helpers/processDailyWeatherData";
import { GlassyText, GlassyView } from "../../Glassy";
import { themeContext } from "../../../context/themeContext";
import Header from "./Header";
import DailyWeatherTile from "./DailyWeatherTile";

function ForecastList({ forecastData }) {
  const { theme } = useContext(themeContext);

  if (!forecastData.length) {
    return (
      <View className="p-4">
        <GlassyText theme={theme}>No forecast data available</GlassyText>
      </View>
    );
  }

  return (
    <FlatList
      className="my-2 gap-4 mx-4 flex-row"
      horizontal
      data={forecastData}
      keyExtractor={(item) => item.time}
      renderItem={({ item }) => <DailyWeatherTile theme={theme} data={item} />}
      contentContainerStyle={{
        gap: 10,
      }}
    />
  );
}

export default function DailyForecast() {
  const { weather } = useContext(WeatherContext);
  const { theme } = useContext(themeContext);
  const [dailyForecast, setDailyForecast] = useState([]);

  // Process weather data whenever it changes
  useEffect(() => {
    if (!weather || !weather.daily) {
      setDailyForecast([]); // Reset if no data
      return;
    }

    try {
      const processedData = processDailyWeatherData(weather);
      setDailyForecast(processedData);
    } catch (error) {
      console.error("Error processing weather data:", error);
      setDailyForecast([]);
    }
  }, [weather]); // Re-run when weather changes

  // Show loading state while waiting for data
  if (!weather) {
    return (
      <GlassyView theme={theme} className="m-4 flex-col w-11/12 ">
        <GlassyText className="text-2xl py-8" theme={theme}>
          Loading weather forecast...
        </GlassyText>
      </GlassyView>
    );
  }

  return (
    <GlassyView theme={theme} className="m-4 flex-col w-11/12 h-fit py-4 gap-4">
      <Header />
      <ForecastList forecastData={dailyForecast} />
    </GlassyView>
  );
}
