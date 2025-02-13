import { useWeather } from "@/context/weatherContext";
import { GlassyText, GlassyView } from "@/components/Glassy";
import HourlyPrecipitation from "./HourlyPrecipitation";
import HourlyTemperature from "./HourlyTemperature";
import { getHourlyDataForDate } from "@/helpers/weather";
import { StyleSheet } from "react-native";

export default function HourlyForecast({ time }: { time: string }) {
  const { hourlyWeather } = useWeather();
  let content = (
    <GlassyText style={styles.loadingText}>
      Loading weather forecast...
    </GlassyText>
  );
  if (hourlyWeather !== null) {
    const hours = getHourlyDataForDate(hourlyWeather.forecast, time);
    content = (
      <>
        <HourlyPrecipitation data={hours} />
        <HourlyTemperature data={hours} />
      </>
    );
  }
  return <GlassyView style={styles.container}>{content}</GlassyView>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  loadingText: {
    fontSize: 24,
    lineHeight: 32,
    paddingVertical: 32,
  },
});
