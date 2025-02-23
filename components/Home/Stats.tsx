import { View } from "react-native";
import { useWeather } from "../../context/weatherContext";
import { GlassyText, GlassyView } from "../../components/Glassy";
import { AwesomeIcon } from "../../components/Icon";
import { statsStyles } from "./styles";
import { weatherCodeToCondition } from "@/helpers/weather/display";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useState } from "react";

function LoadingStats() {
  return (
    <Animated.View entering={FadeInDown.duration(600).springify().damping(10)}>
      <GlassyView style={statsStyles.container}>
        <GlassyText style={statsStyles.header}>Loading...</GlassyText>
        <View>
          <GlassyText style={statsStyles.temperature}>0</GlassyText>
          <GlassyText style={statsStyles.condition}>Unknown</GlassyText>
        </View>
        <View style={statsStyles.statsWrapper}>
          <View style={statsStyles.statistic}>
            <AwesomeIcon name="droplet" size={24} />
            <GlassyText style={statsStyles.statisticText}>0</GlassyText>
          </View>
          <View style={statsStyles.statistic}>
            <AwesomeIcon name="wind" size={24} />
            <GlassyText style={statsStyles.statisticText}>0</GlassyText>
          </View>
          <View style={statsStyles.statistic}>
            <AwesomeIcon name="clock" size={24} />
            <GlassyText style={statsStyles.statisticText}>00:00</GlassyText>
          </View>
          <View style={statsStyles.statistic}>
            <AwesomeIcon name="question" size={24} />
            <GlassyText style={statsStyles.statisticText}>Loading...</GlassyText>
          </View>
        </View>
      </GlassyView>
    </Animated.View>
  );
}

export default function Stats() {
  const { currentWeather, name } = useWeather();
  const [key, setKey] = useState(0);

  if (!currentWeather) return <LoadingStats />;
  const temp = currentWeather.temperature;
  const tempUnit = currentWeather.units.temperature_2m;
  const weatherCode = currentWeather.weatherCode;
  const humidity = currentWeather.humidity;
  const windSpeed = currentWeather.windSpeed;
  const windUnit = currentWeather.units.wind_speed_10m;
  const currentTime = currentWeather.time;
  const isDay = currentWeather.isDay;

  return (
    <Animated.View key={key} entering={FadeInDown.duration(600).springify().damping(10)}>
      <GlassyView style={statsStyles.container}>
        <GlassyText style={statsStyles.header}>{name}</GlassyText>
        <View>
          <GlassyText style={statsStyles.temperature}>{Math.round(temp) + tempUnit}</GlassyText>
          <GlassyText style={statsStyles.condition}>
            {typeof weatherCode == "number"
              ? weatherCodeToCondition(weatherCode, isDay)
              : "Loading Condition..."}
          </GlassyText>
        </View>
        <View style={statsStyles.statsWrapper}>
          <View style={statsStyles.statistic}>
            <AwesomeIcon name="droplet" size={24} />
            <GlassyText style={statsStyles.statisticText}>{humidity}%</GlassyText>
          </View>
          <View style={statsStyles.statistic}>
            <AwesomeIcon name="wind" size={24} />
            <GlassyText style={statsStyles.statisticText}>
              {Math.round(windSpeed)} {windUnit}
            </GlassyText>
          </View>
          <View style={statsStyles.statistic}>
            <AwesomeIcon name="clock" size={24} />
            <GlassyText style={statsStyles.statisticText}>
              {new Date(currentTime).toLocaleTimeString("en-UK", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </GlassyText>
          </View>
          <View style={statsStyles.statistic}>
            <AwesomeIcon name={isDay ? "sun" : "moon"} size={24} />
            <GlassyText style={statsStyles.statisticText}>
              {isDay ? "Daytime" : "Nighttime"}
            </GlassyText>
          </View>
        </View>
      </GlassyView>
    </Animated.View>
  );
}
