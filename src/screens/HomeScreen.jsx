import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import SearchSection from "../components/SearchSection/SearchSection";
import ForecastSection from "../components/ForecastSection/ForecastSection";
import WeatherContextProvider from "../context/weatherContext";
import SearchBarContextProvider from "../context/searchBarContext";

const HomeScreen = () => {
  return (
    <WeatherContextProvider>
      <View className="flex-1 relative">
        <Image
          source={require("../../assets/icons/clear_day.jpg")}
          className="w-full h-full absolute"
          blurRadius={5}
          fadeDuration={0}
          resizeMode="cover"
        />
        <View className="flex-1">
          <SearchBarContextProvider>
            <SearchSection />
          </SearchBarContextProvider>
          <ForecastSection />
        </View>
        <StatusBar style="light" />
      </View>
    </WeatherContextProvider>
  );
};

export default HomeScreen;
