import { useLocalSearchParams } from "expo-router";
import { GlassyText, GlassyView } from "@/components/Glassy";
import StatsView from "@/components/DayDetails/StatsView";
import HourlyForecast from "@/components/DayDetails/HourlyForecast/HourlyForecast";
import { ScrollView, StyleSheet } from "react-native";
import WeatherBackground from "@/components/WeatherBackground";
import { useWeather } from "@/context/weatherContext";
export default function Details() {
  // TODO: Add a context for this screen
  // TODO: Improve UI
  // TODO: Add a dynamic background here too
  const { time } = useLocalSearchParams();
  const { dailyWeather, currentWeather } = useWeather();
  const day = dailyWeather?.forecast.find((day) => day.time === time);
  const isCurrentlyDay = currentWeather?.isDay;
  return (
    <>
      <WeatherBackground
        weatherCode={day?.weather_code}
        isDay={isCurrentlyDay}
      />
      <ScrollView style={styles.container}>
        <GlassyView
          rounded={false}
          safe
          style={styles.safeContainer}
          isTransparent
        >
          {day && <StatsView dayData={day} />}
          {day && <HourlyForecast time={day.time} />}
        </GlassyView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  safeContainer: {
    width: "100%",
    flex: 1,
    padding: 16,
    gap: 20,
  },
});
