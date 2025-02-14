import { View, FlatList } from "react-native";
import DailyWeatherTile from "./DailyWeatherTile";
import { GlassyText } from "@/components/Glassy";
import { DayWeather } from "@/types/apiTypes";
type ForecastListProps = {
  forecastData: DayWeather[];
};
export default function ForecastList({ forecastData }: ForecastListProps) {
  if (!forecastData || forecastData.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <GlassyText>No forecast data available</GlassyText>
      </View>
    );
  }
  return (
    <FlatList
      style={{
        marginVertical: 8,
        gap: 16,
        marginHorizontal: 16,
        flexDirection: "row",
      }}
      horizontal={true}
      data={forecastData}
      keyExtractor={(item) => item.time}
      renderItem={({ item }) => <DailyWeatherTile data={item} />}
      contentContainerStyle={{
        gap: 8,
      }}
    />
  );
}
