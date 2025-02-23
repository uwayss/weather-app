import { FlatList } from "react-native";
import AnimatedWeatherTile from "./AnimatedWeatherTile";
import { DayWeather } from "@/types/apiTypes";

export default function ForecastList({ forecastData }: { forecastData: DayWeather[] }) {
  return (
    <FlatList
      horizontal={true}
      data={forecastData}
      keyExtractor={(item) => item.time}
      renderItem={({ item, index }) => <AnimatedWeatherTile data={item} index={index} />}
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: 16,
      }}
    />
  );
}
