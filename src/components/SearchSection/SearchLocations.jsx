import { useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SearchBarContext } from "../../context/searchBarContext";
import FetchWeather from "../../hooks/useFetchWeather";
import { WeatherContext } from "../../context/weatherContext";
import { GlassyView, GlassyText } from "../Glassy";
import { themeContext } from "../../context/themeContext";
import { storeWeatherData } from "../../helpers/asyncStorage";

export default function SearchLocations() {
  const { locations } = useContext(SearchBarContext);
  const { setWeather } = useContext(WeatherContext);
  const { theme } = useContext(themeContext);

  async function handleLocationChange(location) {
    const newWeather = await FetchWeather(location);
    storeWeatherData(newWeather)
    console.log("Saved weather data into storage");
    setWeather(newWeather);
  }
  return (
    <GlassyView
      className="flex-col h-fit mx-4 gap-0.5 overflow-hidden items-center"
      theme={theme}
    >
      {locations.slice(0, 3).map((location) => (
        <TouchableOpacity
          key={location.display_name}
          className="flex-row items-center"
          onPress={() => handleLocationChange(location)}
        >
          <GlassyView
            className="w-full h-full p-4"
            theme={theme}
            rounded={false}
          >
            <GlassyText theme={theme}>{location.display_name}</GlassyText>
          </GlassyView>
        </TouchableOpacity>
      ))}
    </GlassyView>
  );
}
