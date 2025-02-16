import { StyleSheet } from "react-native";
import { GlassyText, GlassyView } from "@/components/Glassy";
import HourlyRainProbGraph from "@/components/Graphs/HourlyRainProbGraph";
import { HourWeather } from "@/types/apiTypes";
type HourlyPrecipitationProp = {
  data: HourWeather[];
};
export default function HourlyPrecipitation({ data }: HourlyPrecipitationProp) {
  if (!data) {
    return (
      <GlassyView style={{ padding: 16, width: "91%", margin: 8 }}>
        <GlassyText>Data unavailable</GlassyText>
      </GlassyView>
    );
  } else {
    const processedData: { hour: string; precipitation: number }[] = data.map(
      (day: HourWeather) => {
        return {
          hour:
            new Date(day.time).getHours().toString().padStart(2, "0") +
            ":" +
            new Date(day.time).getMinutes().toString().padStart(2, "0"),
          precipitation: day.rainProbability || 0,
        };
      },
    );
    return (
      <GlassyView style={styles.container} isTransparent>
        <GlassyText style={styles.headerStyle}>Rain Probability Graph</GlassyText>
        <HourlyRainProbGraph data={processedData} />
      </GlassyView>
    );
  }
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
