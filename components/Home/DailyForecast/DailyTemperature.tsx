import { GlassyText, GlassyView } from "@/components/Glassy";
import DailyTemperatureGraph from "@/components/Graphs/DailyTemperatureGraph";
import { DayWeather } from "@/types/apiTypes";
import { dailyTemperatureStyles } from "../styles";

export default function TemperatureGraph({ forecastData }: { forecastData: DayWeather[] }) {
  const temperatureData: { day: string; minTemp: number; maxTemp: number }[] = forecastData.map(
    (day: DayWeather) => ({
      day: new Date(day.time).toLocaleDateString("en-UK", {
        weekday: "short",
      }),
      minTemp: day.minTemp || 0,
      maxTemp: day.maxTemp || 0,
    }),
  );
  return (
    <GlassyView style={dailyTemperatureStyles.container} alpha={0.3}>
      <GlassyText style={dailyTemperatureStyles.header}>Temperature Forecast</GlassyText>
      <DailyTemperatureGraph data={temperatureData} />
    </GlassyView>
  );
}
