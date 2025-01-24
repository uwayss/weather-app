import { View, Text } from "react-native";
import React, { useContext } from "react";
import { WeatherContext } from "../context/weatherContext";
import { FontAwesome6 } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function Location() {
  const { weather } = useContext(WeatherContext);
  return (
    <Text className="text-white text-center text-2xl font-bold px-10">
      {weather.name}, {weather.countryName}
    </Text>
  );
}
function StatusIcon() {
  return (
    <View
      className="rounded-xl p-10 bg-gray-400 opacity-70"
      // style={{ backgroundColor: "rbga(255,255,255,.3)" }}
    >
      <Text className="text-white text-sm font-thin tracking-widest opacity-100">
        Weather Icon placeholder
      </Text>
    </View>
  );
}
function Stats() {
  const { weather } = useContext(WeatherContext);
  const currentMinute = new Date().getMinutes();
  let interval = 0;
  if (currentMinute > 15 > 30) {
    interval = (currentMinute - 15) * 60000;
  } else if (currentMinute > 30 > 45) {
    interval = (currentMinute - 30) * 60000;
  } else if (currentMinute > 45) {
    interval = (currentMinute - 45) * 60000;
  } else {
    interval = currentMinute * 60000;
  }
  const preciseTime = new Date(
    new Date(weather.current.time).getTime() + interval
  ).toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <View className="gap-6 w-full py-8">
      <View>
        <Text className="text-white text-center text-8xl font-bold ml-6">
          {weather.current.temperature_2m}&#176;
        </Text>
        <Text className="text-white text-center text-xl tracking-widest">
          {weather.condition}
        </Text>
      </View>
      <View className="flex-row justify-around p-6 flex-wrap gap-4">
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="droplet" size={24} color="white" />
          <Text className="text-white text-center text-lg font-light">
            {weather.current.relative_humidity_2m}%
          </Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="wind" size={24} color="white" />
          <Text className="text-white text-center text-lg font-light">
            {weather.wind_speed_10m} mph
          </Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="clock" size={24} color="white" />
          <Text className="text-white text-center text-lg font-light">
            {preciseTime}
          </Text>
        </View>
      </View>
    </View>
  );
}
function DailyForecast() {
  const { weather } = useContext(WeatherContext);
  return (
    <View className="flex-row gap-4 justify-around flex-wrap">
      <Text className="text-white font-bold text-4xl text-center">
        {"IMPLEMENT NEXT DAY FORECASTS".toLowerCase()}
      </Text>
    </View>
  );
}
const ForecastSection = () => {
  return (
    <SafeAreaView className="flex-1 justify-between items-center mt-32 mb-10">
      <Location />
      <StatusIcon />
      <Stats />
      <DailyForecast />
    </SafeAreaView>
  );
};

export default ForecastSection;
