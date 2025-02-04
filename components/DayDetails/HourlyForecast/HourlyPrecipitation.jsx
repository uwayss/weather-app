import { GlassyText, GlassyView } from "../../Glassy";
import HourlyRainProbGraph from "../../Graphs/HourlyRainProbGraph";
export default function PrecipitationGraph({ data }) {
  if (!data) {
    return (
      <GlassyView className="p-4 w-11/12 m-2">
        <GlassyText>Data unavailable</GlassyText>
      </GlassyView>
    );
  } else {
    const processedData = data.map((day) => {
      return {
        hour:
          new Date(day.time).getHours().toString().padStart(2, "0") +
          ":" +
          new Date(day.time).getMinutes().toString().padStart(2, "0"),
        precipitation: day.rainProbability || 0,
      };
    });

    return (
      <GlassyView className="py-4 m-4" trans>
        <GlassyText className="text-xl font-bold mb-2">
          Rain Probabliity Graph
        </GlassyText>
        <HourlyRainProbGraph data={processedData} />
      </GlassyView>
    );
  }
}
