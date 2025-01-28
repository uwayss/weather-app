import { View, Image, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import SearchSection from "../components/SearchSection/Main";
import ForecastSection from "../components/ForecastSection/Main";
import WeatherContextProvider from "../context/weatherContext";
import SearchBarContextProvider from "../context/searchBarContext";
const HomeScreen = () => {
  // TODO: fix the ui messing up when keyboard is on
  return (
    <WeatherContextProvider>
      <View className="flex-1 relative">
        <Image
          source={require("../../assets/icons/clear_day.jpg")}
          className="w-full h-full absolute"
          blurRadius={5}
          fadeDuration={50}
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
