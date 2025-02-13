import { useLocalSearchParams } from "expo-router";
import { GlassyText, GlassyView } from "@/components/Glassy";
import StatsView from "@/components/DayDetails/StatsView";
import HourlyForecast from "@/components/DayDetails/HourlyForecast/HourlyForecast";
import { ScrollView, StyleSheet } from "react-native";
import WeatherBackground from "@/components/WeatherBackground";
import { useWeather } from "@/context/weatherContext";
export default function DayDetails() {
  // TODO: Add a context for this screen
  // TODO: Improve UI
  // TODO: Add a dynamic background here too
  const { time } = useLocalSearchParams();
  const { dailyWeather } = useWeather();
  const day = dailyWeather?.forecast.find((day) => day.time === time);
  return (
    <ScrollView style={styles.container}>
      <WeatherBackground weatherCode={day?.weather_code} />
      <GlassyView
        rounded={false}
        safe
        style={styles.safeContainer}
        isTransparent
      >
        <GlassyView style={styles.headerContainer}>
          <GlassyText style={styles.header}>
            Detailed Weather for {day?.time}
          </GlassyText>
        </GlassyView>
        {day && <StatsView dayData={day} />}
        {day && <HourlyForecast time={day.time} />}
      </GlassyView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerContainer: {
    padding: 12,
  },
  safeContainer: {
    width: "100%",
    flex: 1,
    padding: 16,
    gap: 20,
  },
});
