import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../../context/weatherContext";
import { View, FlatList } from "react-native";
import { processDailyWeatherData } from "../../../helpers/weather";
import { GlassyText, GlassyView } from "../../Glassy";
import { themeContext } from "../../../context/themeContext";
import Header from "./Header";
import DailyWeatherTile from "./DailyWeatherTile";

function ForecastList({ forecastData }) {
  const { theme } = useContext(themeContext);

  if (!forecastData || forecastData.length === 0) {
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
  const { dailyWeather } = useContext(WeatherContext);
  const { theme } = useContext(themeContext);
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    if (!dailyWeather || dailyWeather === null) { // Explicit null check
      setDailyForecast([]);
      return;
    }
    if (!dailyWeather.forecast) { // Check for forecast property specifically
      setDailyForecast([]);
      return;
    }
    try {


      if (!dailyWeather.forecast || typeof dailyWeather.forecast !== 'object') { // More robust check
        console.error("Error: dailyWeather.forecast is not a valid object:", dailyWeather.forecast);
        setDailyForecast([]);
        return; // Exit the useEffect if it's invalid
      }
      const processedData = processDailyWeatherData(dailyWeather.forecast);
      if (processedData) { // Check if processDailyWeatherData returns a valid result
        setDailyForecast(processedData);
      } else {
        console.error("processDailyWeatherData returned null or undefined.");
        setDailyForecast([]); // Set to empty array in case of processing error
      }
    } catch (error) {
      console.error("Error processing weather data:", error);
      setDailyForecast([]);
    }
  }, [dailyWeather]);

  if (!dailyWeather) {
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