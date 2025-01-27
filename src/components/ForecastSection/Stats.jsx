import { useContext } from "react";
import weatherCodeToCondition from "../../helpers/weatherCodeToCondition";
import { WeatherContext } from "../../context/weatherContext";
import { GlassyText, GlassyView } from "../Glassy";
import { View } from "react-native";
import { FontAwesome6 } from "react-native-vector-icons";
import { themeContext } from "../../context/themeContext";

export default function Stats() {
  const { weather } = useContext(WeatherContext);
  const { theme } = useContext(themeContext);
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
    <GlassyView theme={theme}>
      <View className="gap-2 w-full py-10">
        <View>
          <GlassyText theme={theme} className="text-8xl font-bold ml-6 mr-5">
            {Math.floor(weather.current.temperature_2m) +
              weather.current_units.temperature_2m}
          </GlassyText>
          <GlassyText theme={theme} className="text-xl tracking-widest">
            {weather.current.weather_code
              ? weatherCodeToCondition(weather.current.weather_code)
              : ""}
          </GlassyText>
        </View>
        <View className="flex-row justify-around px-6 flex-wrap gap-4">
          <View className="flex-row gap-2 items-center">
            <FontAwesome6 name="droplet" size={24} color="white" />
            <GlassyText theme={theme} className=" text-lg font-light">
              {weather.current.relative_humidity_2m}%
            </GlassyText>
          </View>
          <View className="flex-row gap-2 items-center">
            <FontAwesome6 name="wind" size={24} color="white" />
            <GlassyText theme={theme} className=" text-lg font-light">
              {Math.round(weather.current.wind_speed_10m)}{" "}
              {weather.current_units.wind_speed_10m}
            </GlassyText>
          </View>
          <View className="flex-row gap-2 items-center">
            <FontAwesome6 name="clock" size={24} color="white" />
            <GlassyText theme={theme} className=" text-lg font-light">
              {preciseTime}
            </GlassyText>
          </View>
        </View>
      </View>
    </GlassyView>
  );
}
