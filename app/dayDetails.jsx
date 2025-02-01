import { useLocalSearchParams } from "expo-router";
import { GlassyText, GlassyView } from "../components/Glassy";
import StatsView from "../components/DayDetails/StatsView";
import HourlyForecast from "../components/DayDetails/HourlyForecast/HourlyForecast";

export default function DayDetails() {
  const { time } = useLocalSearchParams();

  return (
    <GlassyView
      className="h-full p-4 gap-5"
      opaque="bg-slate-400"
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
  );
}
