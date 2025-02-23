import { TouchableOpacity } from "react-native";
import { useSearchBar } from "@/context/searchBarContext";
import FetchWeather from "@/hooks/useFetchWeather";
import { useWeather } from "@/context/weatherContext";
import { GlassyView, GlassyText } from "@/components/Glassy";
import { saveLastLocation, storeWeatherData } from "@/helpers/storage";
import { LocationSearchResult } from "@/types/apiTypes";
import { searchLocationsStyles } from "../styles";

export default function SearchLocations() {
  const { locations, toggleSearch } = useSearchBar();
  const { setWeather } = useWeather();

  async function handleLocationChange(location: LocationSearchResult) {
    toggleSearch();
    const newWeather = await FetchWeather(location);
    storeWeatherData(newWeather);
    console.log("Saved weather data into storage");
    setWeather && setWeather(newWeather);
    saveLastLocation(location);
  }

  function Location({ location }: { location: LocationSearchResult }) {
    return (
      <TouchableOpacity
        style={searchLocationsStyles.locationWrapper}
        onPress={() => handleLocationChange(location)}>
        <GlassyView style={searchLocationsStyles.locationContainer} rounded={false}>
          <GlassyText>{location.display_name}</GlassyText>
        </GlassyView>
      </TouchableOpacity>
    );
  }

  return (
    <GlassyView style={searchLocationsStyles.container}>
      {locations.slice(0, 3).map((location: LocationSearchResult, index) => (
        <Location key={location.display_name} location={location} />
      ))}
    </GlassyView>
  );
}
