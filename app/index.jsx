import { View, Image, ScrollView } from "react-native";
import SearchSection from "../components/Home/SearchSection/SearchSection";
import DailyForecastSection from "../components/Home/DailyForecastSection/DailyForecastSection";
import WeatherProvider from "../context/weatherContext";
import SearchBarProvider from "../context/searchBarContext";
import Stats from "../components/Home/Stats";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css"
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <WeatherProvider>
      <View className="flex-1">
        <Image
          source={require("../assets/backgrounds/clear_day.jpg")}
          className="w-full h-full absolute"
          fadeDuration={50}
          blurRadius={5}
          resizeMode="stretch"
        />
        <ScrollView className="flex-1 w-full">
          <SearchBarProvider>
            <SearchSection />
          </SearchBarProvider>
          <SafeAreaView className="justify-end items-center mt-24 w-full">
            <Stats />
            <DailyForecastSection />
          </SafeAreaView>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </WeatherProvider>
  );
};

export default HomeScreen;
