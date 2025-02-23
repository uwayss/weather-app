import { GlassyText, GlassyView } from "@/components/Glassy";
import DailyRainProbGraph from "@/components/Graphs/DailyRainProbGraph";
import { dailyPrecipitationStyles } from "../styles";
import { DayWeather } from "@/types/apiTypes";

export default function PrecipitationGraph({ forecastData }: { forecastData: DayWeather[] }) {
  const precipitationData: { day: string; precipitation: number }[] = forecastData.map((day) => ({
    day: new Date(day.time).toLocaleDateString("en-UK", { weekday: "short" }),
    precipitation: day.rainProbability || 0,
  }));

  return (
    <GlassyView style={dailyPrecipitationStyles.container} alpha={0.3}>
      <GlassyText style={dailyPrecipitationStyles.title}>Precipitation Forecast</GlassyText>
      <DailyRainProbGraph data={precipitationData} />
    </GlassyView>
  );
}
