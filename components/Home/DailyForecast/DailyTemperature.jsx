import { GlassyText, GlassyView } from "../../Glassy";
import { useWeather } from "../../../context/weatherContext";
import DailyTemperatureGraph from "../../Graphs/DailyTemperatureGraph";

export default function TemperatureGraph() {
  const { dailyWeather } = useWeather();
  if (!dailyWeather || !dailyWeather.forecast) {
    return (
      <GlassyView style={{ padding: 16, width: "91%", margin: 8 }}>
        <GlassyText>Precipitation data unavailable.</GlassyText>
      </GlassyView>
    );
  }
  const TemperatureData = dailyWeather.forecast.map((day) => ({
    day: new Date(day.time).toLocaleDateString("en-UK", { weekday: "short" }),
    minTemp: day.minTemperature || 0,
    maxTemp: day.maxTemperature || 0,
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
      <DailyTemperatureGraph data={{ TemperatureData }} />
    </GlassyView>
  );
}
