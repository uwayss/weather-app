import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchSection from "../components/HomeScreen/SearchSection/SearchSection";
import ForecastSection from "../components/HomeScreen/ForecastSection/ForecastSection";
import WeatherContextProvider from "../context/useWeatherContext";

const HomeScreen = () => {
  return (
    <WeatherContextProvider>
      <View className="flex-1 relative">
        <Image
          source={require("../../assets/sample_bg.jpg")}
          className="w-full h-full absolute"
          blurRadius={100}
          resizeMode="cover"
        />
        <View className="flex-1">
          <SearchSection />
          <ForecastSection />
        </View>
        <StatusBar style="light" />
      </View>
    </WeatherContextProvider>
  );
};

export default HomeScreen;
