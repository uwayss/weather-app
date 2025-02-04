import { GlassyText, GlassyView } from "../../Glassy";
import HourlyTemperatureGraph from "../../Graphs/HourlyTemperatureGraph";

export default function TemperatureGraph({ data }) {
  if (!data) {
    return (
      <GlassyView className="p-4 w-11/12 m-2">
        <GlassyText>Precipitation data unavailable.</GlassyText>
      </GlassyView>
    );
  }
  const TemperatureData = data.map((hour) => ({
    hour:
      new Date(hour.time).getHours().toString().padStart(2, "0") +
      ":" +
      new Date(hour.time).getMinutes().toString().padStart(2, "0"),
    temperature: hour.temperature,
  }));
  return (
    <GlassyView className="p-4 m-4">
      <GlassyText className="text-xl font-bold mb-2">
        Temperature Forecast
      </GlassyText>
      <HourlyTemperatureGraph data={{ TemperatureData }} />
    </GlassyView>
  );
}
