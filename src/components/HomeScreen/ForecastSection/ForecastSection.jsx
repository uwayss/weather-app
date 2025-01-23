import { View, Text } from "react-native";
import React, { useContext } from "react";
import { WeatherContext } from "../../../context/useWeatherContext";
import { FontAwesome6 } from "react-native-vector-icons";

function Location() {
  const { weather } = useContext(WeatherContext);

  return (
    <Text className="text-white text-center text-3xl font-bold">
      {weather.location}, {weather.country}
    </Text>
  );
}
function StatusIcon() {
  return <Text className="text-white text-4xl font-bold">Weather Image</Text>;
}
function Stats() {
  const { weather } = useContext(WeatherContext);
  return (
    <View
      className="gap-6 rounded-2xl w-72 py-8"
      style={{
        backgroundColor: "rgba(255,255,255,0.2)",
      }}
    >
      <View className="">
        <Text className="text-white text-center text-6xl font-bold ml-6">
          {weather.temp}&#176;
        </Text>
        <Text className="text-white text-center text-xl tracking-widest">
          {weather.condition}
        </Text>
      </View>
      <View className="flex-row justify-around p-6 flex-wrap gap-4">
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="droplet" size={18} color="white" />
          <Text className="text-white text-center font-light">
            {weather.humidity}%
          </Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="wind" size={18} color="white" />
          <Text className="text-white text-center font-light">
            {weather.windSpeed} mph
          </Text>
        </View>
      </View>
    </View>
  );
}

const ForecastSection = () => {
  return (
    <View className="w-full flex-1 justify-around items-center">
      <Location />
      <StatusIcon />
      <Stats />
    </View>
  );
};

export default ForecastSection;
