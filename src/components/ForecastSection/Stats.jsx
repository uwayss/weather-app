import { View } from "react-native";
import { useContext } from "react";
import { weatherCodeToCondition } from "../../helpers/weather";
import { WeatherContext } from "../../context/weatherContext";
import { GlassyText, GlassyView } from "../Glassy";
import { FontAwesome6 } from "react-native-vector-icons";

export default function Stats() {
  const { currentWeather, weatherName } = useContext(WeatherContext); // Destructure from context

  if (!currentWeather) { // Check currentWeather for null
    return (
      <GlassyView className="items-center py-3 gap-3 w-11/12">
        <GlassyText className="text-center text-xl">
          Weather data unavailable. Please try again later.
        </GlassyText>
      </GlassyView>
    );
  }

  const temp = currentWeather.temperature_2m;
  const tempUnit = currentWeather.units?.temperature_2m; // Optional chaining for units
  const weatherCode = currentWeather.weather_code;
  const humidity = currentWeather.relative_humidity_2m;
  const windSpeed = currentWeather.wind_speed_10m;
  const windUnit = currentWeather.units?.wind_speed_10m; // Optional chaining for units
  const currentTime = currentWeather.time;
  const locationName = weatherName;

  return (
    <GlassyView className="items-center py-4 gap-5 w-11/12">
      <GlassyText className="text-2xl font-bold w-full h-fit">
        {locationName}
      </GlassyText>
      <View>
        <GlassyText className="text-7xl font-bold mx-6">
          {Math.round(temp) + tempUnit}
        </GlassyText>
        <GlassyText className="text-xl tracking-widest">
          {typeof weatherCode == "number" ? weatherCodeToCondition(weatherCode) : "Loading Condition..."}
        </GlassyText>
      </View>
      <View className="flex-row justify-around px-6 flex-wrap gap-6">
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="droplet" size={24} color="white" />
          <GlassyText className="text-base font-light">
            {humidity}%
          </GlassyText>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="wind" size={24} color="white" />
          <GlassyText className="text-base font-light">
            {Math.round(windSpeed)} {windUnit}
          </GlassyText>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="clock" size={24} color="white" />
          <GlassyText className="text-base font-light">
            {new Date(currentTime).toLocaleTimeString("en-UK", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit"
            })}
          </GlassyText>
        </View>
      </View>
    </GlassyView>
  );
}