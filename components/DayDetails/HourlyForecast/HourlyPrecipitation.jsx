import { GlassyText, GlassyView } from "../../Glassy";
import HourlyRainProbGraph from "../../Graphs/HourlyRainProbGraph";
export default function PrecipitationGraph({ data }) {
  if (!data) {
    return (
      <GlassyView style={{ padding: 16, width: "91%", margin: 8 }}>
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
      <GlassyView style={{ paddingVertical: 16, marginVertical: 16 }} trans>
        <GlassyText
          style={{
            fontSize: 20,
            lineHeight: 28,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Rain Probabliity Graph
        </GlassyText>
        <HourlyRainProbGraph data={processedData} />
      </GlassyView>
    );
  }
}
