import { View } from "react-native";
import { weatherCodeToCondition } from "../../helpers/weather";
import { useWeather } from "../../context/weatherContext";
import { Surface, Text } from "react-native-paper";
import { AwesomeIcon } from "../../components/Icon";
import { statsStyles } from "./styles";

function LoadingStats() {
  return (
    <Surface style={[statsStyles.container]} elevation={0}>
      <Text variant="titleLarge" style={statsStyles.header}>
        Loading...
      </Text>
      <View>
        <Text variant="displayLarge" style={statsStyles.temperature}>
          0
        </Text>
        <Text variant="titleMedium" style={statsStyles.condition}>
          Unknown
        </Text>
      </View>
      <View style={statsStyles.statsWrapper}>
        <View style={statsStyles.statistic}>
          <AwesomeIcon name="droplet" size={24} />
          <Text variant="bodyLarge" style={statsStyles.statisticText}>
            0
          </Text>
        </View>
        <View style={statsStyles.statistic}>
          <AwesomeIcon name="wind" size={24} />
          <Text variant="bodyLarge" style={statsStyles.statisticText}>
            0
          </Text>
        </View>
        <View style={statsStyles.statistic}>
          <AwesomeIcon name="clock" size={24} />
          <Text variant="bodyLarge" style={statsStyles.statisticText}>
            00:00
          </Text>
        </View>
        <View style={statsStyles.statistic}>
          <AwesomeIcon name="question" size={24} />
          <Text variant="bodyLarge" style={statsStyles.statisticText}>
            Loading...
          </Text>
        </View>
      </View>
    </Surface>
  );
}

export default function Stats() {
  const { currentWeather, name } = useWeather();

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
    <Surface style={[statsStyles.container]} elevation={0}>
      <Text variant="titleLarge" style={statsStyles.header}>
        {name}
      </Text>
      <View>
        <Text variant="displayLarge" style={statsStyles.temperature}>
          {Math.round(temp) + tempUnit}
        </Text>
        <Text variant="titleMedium" style={statsStyles.condition}>
          {typeof weatherCode == "number"
            ? weatherCodeToCondition(weatherCode, isDay)
            : "Loading Condition..."}
        </Text>
      </View>
      <View style={statsStyles.statsWrapper}>
        <View style={statsStyles.statistic}>
          <AwesomeIcon name="droplet" size={24} />
          <Text variant="bodyLarge" style={statsStyles.statisticText}>
            {humidity}%
          </Text>
        </View>
        <View style={statsStyles.statistic}>
          <AwesomeIcon name="wind" size={24} />
          <Text variant="bodyLarge" style={statsStyles.statisticText}>
            {Math.round(windSpeed)} {windUnit}
          </Text>
        </View>
        <View style={statsStyles.statistic}>
          <AwesomeIcon name="clock" size={24} />
          <Text variant="bodyLarge" style={statsStyles.statisticText}>
            {new Date(currentTime).toLocaleTimeString("en-UK", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View style={statsStyles.statistic}>
          <AwesomeIcon name={isDay ? "sun" : "moon"} size={24} />
          <Text variant="bodyLarge" style={statsStyles.statisticText}>
            {isDay ? "Daytime" : "Nighttime"}
          </Text>
        </View>
      </View>
    </Surface>
  );
}
