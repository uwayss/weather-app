import { GlassyText, GlassyView } from "@/components/Glassy";
import HourlyRainProbGraph from "@/components/Graphs/HourlyRainProbGraph";
import { HourlyRainProbGraphProps, HourWeather } from "@/types/apiTypes";
import { hourlyPrecipitationStyles } from "./styles";
type HourlyPrecipitationProp = {
  data: HourWeather[];
};
export default function HourlyPrecipitation({ data }: HourlyPrecipitationProp) {
  let content = (
    <GlassyView style={hourlyPrecipitationStyles.container}>
      <GlassyText>Data unavailable</GlassyText>
    </GlassyView>
  );
  if (data) {
    const processedData: HourlyRainProbGraphProps = data.map((day: HourWeather) => {
      return {
        hour:
          new Date(day.time).getHours().toString().padStart(2, "0") +
          ":" +
          new Date(day.time).getMinutes().toString().padStart(2, "0"),
        precipitation: day.rainProbability || 0,
      };
    });
    content = (
      <GlassyView style={hourlyPrecipitationStyles.container}>
        <GlassyText style={hourlyPrecipitationStyles.headerStyle}>
          Rain Probability Graph
        </GlassyText>
        <HourlyRainProbGraph data={processedData} />
      </GlassyView>
    );
  }
  return content;
}
