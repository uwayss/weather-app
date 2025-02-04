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
    <ScrollView className="w-full flex-1">
      <GlassyView
        className="h-full p-4 gap-5"
        opaque={theme.background}
        rounded={false}
      >
        <GlassyView safe className="p-5">
          <GlassyText className="text-2xl font-bold text-center">
            Detailed Weather for {time}
          </GlassyText>
        </GlassyView>
        <StatsView time={time} />
        <HourlyForecast time={time} />
      </GlassyView>
    </ScrollView>
  );
}
