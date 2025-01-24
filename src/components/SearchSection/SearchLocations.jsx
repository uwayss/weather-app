import { useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SearchBarContext } from "../../context/searchBarContext";
import FetchWeather from "../../hooks/useFetchWeather";
import { WeatherContext } from "../../context/weatherContext";

export default function SearchLocations() {
  const { locations } = useContext(SearchBarContext);
  const { setWeather } = useContext(WeatherContext);
  async function handleLocationChange(location) {
    const newWeather = await FetchWeather(location);
    setWeather(newWeather);
  }
  return (
    <View className="flex-column h-fit bg-gray-700 rounded-3xl mx-4 gap-1 overflow-hidden items-center">
      {locations.slice(0, 3).map((location, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center"
          onPress={() => handleLocationChange(location)}
        >
          <View className="w-full h-full bg-gray-600 px-5 py-5">
            <Text className="text-white">{location.display_name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
