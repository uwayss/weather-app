import { useContext } from "react";
import weatherCodeToCondition from "../../helpers/weatherCodeToCondition";
import { WeatherContext } from "../../context/weatherContext";
import { GlassyText, GlassyView } from "../Glassy";
import { View } from "react-native";
import { FontAwesome6 } from "react-native-vector-icons";
import { themeContext } from "../../context/themeContext";
import getPreciseTime from "../../helpers/getPreciseTime";

export default function Stats() {
  const { currentWeather, weatherName } = useContext(WeatherContext); // Destructure from context
  const { theme } = useContext(themeContext);

  if (!currentWeather) { // Check currentWeather for null
    return (
      <GlassyView theme={theme} className="items-center py-6 gap-6 w-11/12">
        <GlassyText theme={theme} className="text-center text-xl">
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
  const locationName = weatherName; // Use weatherName from context

  return (
    <GlassyView theme={theme} className="items-center py-6 gap-6 w-11/12">
      <GlassyText theme={theme} className="text-2xl font-bold w-full h-fit">
        {locationName}
      </GlassyText>
      <View>
        <GlassyText theme={theme} className="text-8xl font-bold ml-6 mr-5">
          {Math.round(temp) + tempUnit}
        </GlassyText>
        <GlassyText theme={theme} className="text-xl tracking-widest">
          {typeof weatherCode == "number" ? weatherCodeToCondition(weatherCode) : "Loading Condition..."}
        </GlassyText>
      </View>
      <View className="flex-row justify-around px-6 flex-wrap gap-4">
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="droplet" size={24} color="white" />
          <GlassyText theme={theme} className=" text-lg font-light">
            {humidity}%
          </GlassyText>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="wind" size={24} color="white" />
          <GlassyText theme={theme} className=" text-lg font-light">
            {Math.round(windSpeed)} {windUnit}
          </GlassyText>
        </View>
        <View className="flex-row gap-2 items-center">
          <FontAwesome6 name="clock" size={24} color="white" />
          <GlassyText theme={theme} className=" text-lg font-light">
            {getPreciseTime(currentTime)}
          </GlassyText>
        </View>
      </View>
    </GlassyView>
  );
}