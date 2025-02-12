import { useLocalSearchParams } from "expo-router";
import { GlassyText, GlassyView } from "../components/Glassy";
import StatsView from "../components/DayDetails/StatsView";
import HourlyForecast from "../components/DayDetails/HourlyForecast/HourlyForecast";
import { useTheme } from "../context/themeContext";
import { ScrollView, StyleSheet } from "react-native";

export default function DayDetails() {
  const { time } = useLocalSearchParams();
  const { theme } = useTheme();
  // TODO: Add a context for this screen
  // TODO: Improve UI
  // TODO: Add a dynamic background here too
  return (
    <ScrollView
      style={{
        backgroundColor: theme.background,
        width: "100%",
        flex: 1,
      }}
    >
      <GlassyView isTransparent rounded={false} safe style={styles.container}>
        <GlassyView style={styles.headerContainer}>
          <GlassyText style={styles.header}>
            Detailed Weather for {time}
          </GlassyText>
        </GlassyView>
        <StatsView time={time} />
        <HourlyForecast time={time} />
      </GlassyView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
    gap: 20,
  },
  header: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerContainer: {
    padding: 12,
  },
});
