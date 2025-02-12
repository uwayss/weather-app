import { useLocalSearchParams } from "expo-router";
import { GlassyText, GlassyView } from "../components/Glassy";
import StatsView from "../components/DayDetails/StatsView";
import HourlyForecast from "../components/DayDetails/HourlyForecast/HourlyForecast";
import { useTheme } from "../context/themeContext";
import { ScrollView } from "react-native";

export default function DayDetails() {
  const { time } = useLocalSearchParams();
  const { theme } = useTheme();
  // TODO: Add a context for this screen
  // TODO: Improve UI

  return (
    <ScrollView
      style={{
        backgroundColor: `rgb(${theme.background})`,
        width: "100%",
        flex: 1,
      }}
    >
      <GlassyView
        style={{ height: "100%", padding: 16, gap: 20 }}
        isTransparent
        rounded={false}
      >
        <GlassyView safe style={{ padding: 20 }}>
          <GlassyText
            style={{
              fontSize: 24,
              lineHeight: 32,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Detailed Weather for {time}
          </GlassyText>
        </GlassyView>
        <StatsView time={time} />
        <HourlyForecast time={time} />
      </GlassyView>
    </ScrollView>
  );
}
