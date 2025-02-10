import { GlassyText, GlassyView } from "../../Glassy";
import { useWeather } from "../../../context/weatherContext";
import DailyRainProbGraph from "../../Graphs/DailyRainProbGraph";

export default function PrecipitationGraph() {
  const { dailyWeather } = useWeather();
  if (!dailyWeather || !dailyWeather.forecast) {
    return (
      <GlassyView className="p-4 w-11/12 m-2">
        <GlassyText>Precipitation data unavailable.</GlassyText>
      </GlassyView>
    );
  }
  const precipitationData = dailyWeather.forecast.map((day) => ({
    day: new Date(day.time).toLocaleDateString("en-UK", { weekday: "short" }),
    precipitation: day.rainProbability || 0,
  }));

  return (
    <GlassyView className="p-4 m-4 gap-2" transparency={30}>
      <GlassyText className="text-xl font-bold">
        Precipitation Forecast
      </GlassyText>
      <DailyRainProbGraph data={precipitationData} />
    </GlassyView>
  );
}
