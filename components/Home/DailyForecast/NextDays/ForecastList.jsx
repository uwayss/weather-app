import { View, FlatList } from "react-native";
import DailyWeatherTile from "./DailyWeatherTile";
import { GlassyText } from "../../../Glassy";

export default function ForecastList({ forecastData }) {
  if (!forecastData || forecastData.length === 0) {
    return (
      <View className="p-4">
        <GlassyText>No forecast data available</GlassyText>
      </View>
    );
  }
  return (
    <FlatList
      className="my-2 gap-4 mx-4 flex-row"
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
