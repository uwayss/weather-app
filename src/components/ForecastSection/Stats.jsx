import { useContext } from "react";
import weatherCodeToCondition from "../../helpers/weatherCodeToCondition";
import { WeatherContext } from "../../context/weatherContext";
import { GlassyText, GlassyView } from "../Glassy";
import { View } from "react-native";
import { FontAwesome6 } from "react-native-vector-icons";
import { themeContext } from "../../context/themeContext";
import getPreciseTime from "../../helpers/getPreciseTime";

export default function Stats() {
  const {
    temp,
    tempUnit,
    weatherCode,
    humidity,
    windSpeed,
    windUnit,
    currentTime,
    weather,
  } = useContext(WeatherContext);
  const { theme } = useContext(themeContext);

  return (
    <GlassyView theme={theme} className="items-center py-6 gap-6 w-11/12">
      <GlassyText theme={theme} className="text-2xl font-bold w-full h-fit">
        {weather.name}
      </GlassyText>
      <View>
        <GlassyText theme={theme} className="text-8xl font-bold ml-6 mr-5">
          {temp + tempUnit}
        </GlassyText>
        <GlassyText theme={theme} className="text-xl tracking-widest">
          {weatherCode ? weatherCodeToCondition(weatherCode) : ""}
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
