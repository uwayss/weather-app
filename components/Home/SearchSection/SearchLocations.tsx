import { StyleSheet, TouchableOpacity } from "react-native";
import { useSearchBar } from "@/context/searchBarContext";
import FetchWeather from "@/hooks/useFetchWeather";
import { useWeather } from "@/context/weatherContext";
import { GlassyView, GlassyText } from "@/components/Glassy";
import { saveLastLocation, storeWeatherData } from "@/helpers/storage";
import { LocationSearchResult } from "@/types/apiTypes";

export default function SearchLocations() {
  const { locations, toggleSearch } = useSearchBar();
  const { setWeather } = useWeather();

  async function handleLocationChange(location: LocationSearchResult) {
    toggleSearch();
    const newWeather = await FetchWeather(location);
    storeWeatherData(newWeather);
    console.log("Saved weather data into storage");
    setWeather && setWeather(newWeather);
    await saveLastLocation(location);
  }

  function Location({ location }: { location: LocationSearchResult }) {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => handleLocationChange(location)}>
        <GlassyView style={{ width: "100%", height: "100%", padding: 16 }} rounded={false}>
          <GlassyText>{location.display_name}</GlassyText>
        </GlassyView>
      </TouchableOpacity>
    );
  }

  return (
    <GlassyView style={styles.container}>
      {locations.slice(0, 3).map((location: LocationSearchResult, index) => (
        <Location key={location.display_name} location={location} />
      ))}
    </GlassyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: 16,
    gap: 2,
    alignItems: "center",
  },
});
