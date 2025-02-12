import { GlassyText, GlassyView } from "../../Glassy";
import { useWeather } from "../../../context/weatherContext";
import DailyRainProbGraph from "../../Graphs/DailyRainProbGraph";

export default function PrecipitationGraph() {
  const { dailyWeather } = useWeather();
  if (!dailyWeather || !dailyWeather.forecast) {
    return (
      <GlassyView style={{ padding: 16, width: "91%", margin: 8 }}>
        <GlassyText>Precipitation data unavailable.</GlassyText>
      </GlassyView>
    );
  }
  const precipitationData = dailyWeather.forecast.map((day) => ({
    day: new Date(day.time).toLocaleDateString("en-UK", { weekday: "short" }),
    precipitation: day.rainProbability || 0,
  }));

  return (
    <GlassyView style={{ padding: 16, margin: 16, gap: 8 }} alpha={0.3}>
      <GlassyText style={{ fontSize: 20, lineHeight: 28, fontWeight: "bold" }}>
        Precipitation Forecast
      </GlassyText>
      <DailyRainProbGraph data={precipitationData} />
    </GlassyView>
  );
}
