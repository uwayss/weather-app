import { useRouter, useLocalSearchParams } from "expo-router";
import { View, ScrollView, StyleSheet } from "react-native";
import { GlassyView } from "../components/Glassy";
import WeatherBackground from "../components/WeatherBackground";
import { useWeather } from "../context/weatherContext";
import StatsView from "../components/DayDetails/StatsView";
import HourlyForecast from "../components/DayDetails/HourlyForecast/HourlyForecast";
import { findDayWeatherFromTime } from "../helpers/weather";
import CloseButton from "../components/DayDetails/CloseButton";
export default function DayDetailsScreen() {
  const router = useRouter();
  const { dayId } = useLocalSearchParams<{ dayId: string }>();
  const { dailyWeather, currentWeather } = useWeather();
  const dayData = findDayWeatherFromTime(dayId, dailyWeather?.forecast);
  const isCurrentlyDay = currentWeather?.isDay;
  return (
    <View style={styles.container}>
      <WeatherBackground weatherCode={dayData?.weather_code} isDay={isCurrentlyDay} />
      <ScrollView style={{ height: "100%", width: "100%" }}>
        <GlassyView rounded={false} style={styles.safeContainer} isTransparent safe>
          <CloseButton onClose={() => router.back()} />
          {dayData && <StatsView dayData={dayData} />}
          {dayData && <HourlyForecast time={dayData.time} />}
        </GlassyView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  safeContainer: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
    padding: 16,
  },
});
