import { StyleSheet } from "react-native";
import { GlassyText, GlassyView } from "@/components/Glassy";
import HourlyRainProbGraph from "@/components/Graphs/HourlyRainProbGraph";
import { HourlyRainProbGraphProps, HourWeather } from "@/types/apiTypes";
type HourlyPrecipitationProp = {
  data: HourWeather[];
};
export default function HourlyPrecipitation({ data }: HourlyPrecipitationProp) {
  let content = (
    <GlassyView style={styles.container}>
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
      <GlassyView style={styles.container}>
        <GlassyText style={styles.headerStyle}>Rain Probability Graph</GlassyText>
        <HourlyRainProbGraph data={processedData} />
      </GlassyView>
    );
  }
  return content;
}
const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 28,
  },
  container: {
    paddingVertical: 16,
  },
});
