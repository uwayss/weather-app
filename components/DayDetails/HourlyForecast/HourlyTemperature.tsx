import { HourlyTemperatureGraphProps, HourWeather } from "@/types/apiTypes";
import { GlassyText, GlassyView } from "@/components/Glassy";
import HourlyTemperatureGraph from "@/components/Graphs/HourlyTemperatureGraph";
type HourlyTemperatureProp = {
  data: HourWeather[];
};
export default function HourlyTemperature({ data }: HourlyTemperatureProp) {
  if (!data) {
    return (
      <GlassyView style={{ padding: 16, width: "91%", margin: 8 }}>
        <GlassyText>Precipitation data unavailable.</GlassyText>
      </GlassyView>
    );
  }
  const TemperatureData: HourlyTemperatureGraphProps = data.map((hour: HourWeather) => ({
    hour:
      new Date(hour.time).getHours().toString().padStart(2, "0") +
      ":" +
      new Date(hour.time).getMinutes().toString().padStart(2, "0"),
    temperature: hour.temperature,
  }));
  return (
    <GlassyView style={{ padding: 16 }}>
      <GlassyText style={{ fontSize: 20, lineHeight: 28, marginBottom: 8 }}>
        Temperature Forecast
      </GlassyText>
      <HourlyTemperatureGraph data={TemperatureData} />
    </GlassyView>
  );
}
