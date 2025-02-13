import { View, Text, StyleSheet } from "react-native";
import { weatherCodeToCondition } from "../../../helpers/weather";
import { useWeather } from "../../../context/weatherContext";
import { GlassyText, GlassyView } from "../../Glassy";
import { AwesomeIcon } from "../../Icon";
export default function Stats() {
  const { currentWeather, name } = useWeather();

  if (!currentWeather) {
    return (
      <GlassyView style={styles.container}>
        <GlassyText style={styles.header}>Loading...</GlassyText>
        <View>
          <GlassyText style={styles.temperature}>0</GlassyText>
          <GlassyText style={styles.condition}>Unknown</GlassyText>
        </View>
        <View style={styles.statsWrapper}>
          <View style={styles.statistic}>
            <AwesomeIcon name="droplet" size={24} />
            <GlassyText style={styles.statisticText}>0</GlassyText>
          </View>
          <View style={styles.statistic}>
            <AwesomeIcon name="wind" size={24} />
            <GlassyText style={styles.statisticText}>0</GlassyText>
          </View>
          <View style={styles.statistic}>
            <AwesomeIcon name="clock" size={24} />
            <GlassyText style={styles.statisticText}>00:00</GlassyText>
          </View>
          <View style={styles.statistic}>
            <AwesomeIcon name="question" size={24} />
            <GlassyText style={styles.statisticText}>Loading...</GlassyText>
          </View>
        </View>
      </GlassyView>
    );
  }
  const temp = currentWeather.temperature;
  const tempUnit = currentWeather.units.temperature_2m;
  const weatherCode = currentWeather.weatherCode;
  const humidity = currentWeather.humidity;
  const windSpeed = currentWeather.windSpeed;
  const windUnit = currentWeather.units.wind_speed_10m;
  const currentTime = currentWeather.time;
  const isDay = currentWeather.isDay;

  return (
    <GlassyView style={styles.container}>
      <GlassyText style={styles.header}>{name}</GlassyText>
      <View>
        <GlassyText style={styles.temperature}>
          {Math.round(temp) + tempUnit}
        </GlassyText>
        <GlassyText style={styles.condition}>
          {typeof weatherCode == "number"
            ? weatherCodeToCondition(weatherCode, isDay)
            : "Loading Condition..."}
        </GlassyText>
      </View>
      <View style={styles.statsWrapper}>
        <View style={styles.statistic}>
          <AwesomeIcon name="droplet" size={24} />
          <GlassyText style={styles.statisticText}>{humidity}%</GlassyText>
        </View>
        <View style={styles.statistic}>
          <AwesomeIcon name="wind" size={24} />
          <GlassyText style={styles.statisticText}>
            {Math.round(windSpeed)} {windUnit}
          </GlassyText>
        </View>
        <View style={styles.statistic}>
          <AwesomeIcon name="clock" size={24} />
          <GlassyText style={styles.statisticText}>
            {new Date(currentTime).toLocaleTimeString("en-UK", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </GlassyText>
        </View>
        <View style={styles.statistic}>
          <AwesomeIcon name={isDay ? "sun" : "moon"} size={24} />
          <GlassyText style={styles.statisticText}>
            {isDay ? "Daytime" : "Nighttime"}
          </GlassyText>
        </View>
      </View>
    </GlassyView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
    width: "91%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
  },
  condition: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  statsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    paddingLeft: 24,
  },
  statistic: {
    width: "35%",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  statisticText: {
    fontWeight: "light",
  },
});
