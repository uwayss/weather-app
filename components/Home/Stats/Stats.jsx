import { View } from "react-native";
import { weatherCodeToCondition } from "../../../helpers/weather";
import { useWeather } from "../../../context/weatherContext";
import { GlassyText, GlassyView } from "../../Glassy";
import { AwesomeIcon } from "../../Icon";

export default function Stats() {
  const { currentWeather, weatherName } = useWeather();

  if (!currentWeather) {
    return (
      <GlassyView className="items-center py-3 gap-3 w-11/12">
        <GlassyText className="text-center text-xl">
          Weather data unavailable. Please try again later.
        </GlassyText>
      </GlassyView>
    );
  }

  const temp = currentWeather.temperature_2m;
  const tempUnit = currentWeather.units?.temperature_2m;
  const weatherCode = currentWeather.weather_code;
  const humidity = currentWeather.relative_humidity_2m;
  const windSpeed = currentWeather.wind_speed_10m;
  const windUnit = currentWeather.units?.wind_speed_10m;
  const currentTime = currentWeather.time;
  const isDay = currentWeather.is_day;
  const locationName = weatherName;

  return (
    <GlassyView className="items-center py-3 gap-4 w-11/12">
      <GlassyText className="text-2xl font-bold w-full h-fit">
        {locationName}
      </GlassyText>
      <View>
        <GlassyText className="text-7xl font-bold mx-6">
          {Math.round(temp) + tempUnit}
        </GlassyText>
        <GlassyText className="text-lg tracking-wider">
          {typeof weatherCode == "number"
            ? weatherCodeToCondition(weatherCode, isDay)
            : "Loading Condition..."}
        </GlassyText>
      </View>
      <View className="flex-row flex-wrap gap-2 justify-center pl-6">
        <View className="w-[35%] flex-row gap-2 items-center">
          <AwesomeIcon name="droplet" size={24} />
          <GlassyText className="text-base font-light">{humidity}%</GlassyText>
        </View>
        <View className="w-[35%] flex-row gap-2 items-center">
          <AwesomeIcon name="wind" size={24} />
          <GlassyText className="text-base font-light">
            {Math.round(windSpeed)} {windUnit}
          </GlassyText>
        </View>
        <View className="w-[35%] flex-row gap-2 items-center">
          <AwesomeIcon name="clock" size={24} />
          <GlassyText className="text-base font-light">
            {new Date(currentTime).toLocaleTimeString("en-UK", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </GlassyText>
        </View>
        <View className="w-[35%] flex-row gap-2 items-center">
          <AwesomeIcon name={isDay ? "sun" : "moon"} size={24} />
          <GlassyText className="text-base font-light">
            {isDay ? "Daytime" : "Nighttime"}
          </GlassyText>
        </View>
      </View>
    </GlassyView>
  );
}
