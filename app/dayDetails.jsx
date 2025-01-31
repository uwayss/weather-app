import { useLocalSearchParams } from "expo-router";
import { GlassyText, GlassyView } from "../components/Glassy";
import StatsView from "../components/DayDetails/StatsView";

export default function DayDetails() {
    const data = useLocalSearchParams();
    return (
        <GlassyView className="h-full p-4 gap-5" opaque="bg-slate-400">
            <GlassyView safe className="p-5">
                <GlassyText className="text-2xl font-bold text-center">
                    Detailed Weather for {data.time}
                </GlassyText>
            </GlassyView>
            <StatsView data={data} />
        </GlassyView>
    );
}