import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useWeather } from "../../../context/weatherContext";
import { processDailyWeatherData } from "../../../helpers/weather";
import { GlassyText, GlassyView } from "../../Glassy";
import Header from "./Header";
import DailyWeatherTile from "./DailyWeatherTile";
import PrecipitationGraph from "./PrecipitationGraph";
import TemperatureGraph from "./TemperatureGraph";


function ForecastList({ forecastData }) {
  if (!forecastData || forecastData.length === 0) {
    return (
      <View className="p-4">
        <GlassyText>No forecast data available</GlassyText>
      </View>
    );
  }

  return (
    <FlatList
      className="my-2 gap-4 mx-4 flex-row"
      horizontal={true}
      data={forecastData}
      keyExtractor={(item) => item.time}
      snapToInterval={120} // Width of DailyWeatherTile (w-48)
      decelerationRate="fast"
      snapToAlignment="start"
      renderItem={({ item }) => <DailyWeatherTile data={item} />}
      contentContainerStyle={{
        gap: 8,
      }}
    />
  );
}

export default function DailyForecast() {
  const { dailyWeather } = useWeather();
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
      <GlassyView className="m-2 flex-col w-11/12 ">
        <GlassyText className="text-2xl py-8">
          Loading weather forecast...
        </GlassyText>
      </GlassyView>
    );
  }

  return (
    <GlassyView className="m-2 flex-col w-11/12 h-fit align-center">
      <Header />
      <ForecastList forecastData={dailyForecast} />
      <PrecipitationGraph />
      <TemperatureGraph />
    </GlassyView>
  );
}