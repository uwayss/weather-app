import { FlatList } from "react-native";
import DailyWeatherTile from "./DailyWeatherTile";
import { DayWeather } from "@/types/apiTypes";

export default function ForecastList({ forecastData }: { forecastData: DayWeather[] }) {
  return (
    <FlatList
      horizontal={true}
      data={forecastData}
      keyExtractor={(item) => item.time}
      renderItem={({ item }) => <DailyWeatherTile data={item} />}
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: 16,
      }}
    />
  );
}
