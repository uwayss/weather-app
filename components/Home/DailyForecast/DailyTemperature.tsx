import { GlassyText, GlassyView } from "../../Glassy";
import { useWeather } from "../../../context/weatherContext";
import DailyTemperatureGraph from "../../Graphs/DailyTemperatureGraph";
import { DayWeather } from "../../../types/apiTypes";

export default function TemperatureGraph() {
  const { dailyWeather } = useWeather();

  if (!dailyWeather || !dailyWeather.forecast) {
    return (
      <GlassyView style={{ padding: 16, width: "91%", margin: 8 }}>
        <GlassyText>Temperature data unavailable.</GlassyText>
      </GlassyView>
    );
  }

  const temperatureData: { day: string; minTemp: number; maxTemp: number }[] =
    dailyWeather.forecast.map((day: DayWeather) => ({
      day: new Date(day.time).toLocaleDateString("en-UK", {
        weekday: "short",
      }),
      minTemp: day.minTemp || 0,
      maxTemp: day.maxTemp || 0,
    }));

  return (
    <GlassyView
      style={{ padding: 16, margin: 16, alignItems: "center" }}
      alpha={0.3}
    >
      <GlassyText
        style={{
          fontSize: 20,
          lineHeight: 28,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Temperature Forecast
      </GlassyText>
      <DailyTemperatureGraph data={temperatureData} />
    </GlassyView>
  );
}
