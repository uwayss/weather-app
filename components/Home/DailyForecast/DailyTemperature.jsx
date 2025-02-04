import { GlassyText, GlassyView } from "../../Glassy";
import { useWeather } from "../../../context/weatherContext";
import DailyTemperatureGraph from "../../Graphs/DailyTemperatureGraph";

export default function TemperatureGraph() {
  const { dailyWeather } = useWeather();
  if (!dailyWeather || !dailyWeather.forecast) {
    return (
      <GlassyView className="p-4 w-11/12 m-2">
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
    <GlassyView className="p-4 m-4 items-center" transparency={30}>
      <GlassyText className="text-xl font-bold mb-2">
        Temperature Forecast
      </GlassyText>
      <DailyTemperatureGraph data={{ TemperatureData }} />
    </GlassyView>
  );
}
