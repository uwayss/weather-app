import { View, Image, ScrollView } from "react-native";
import SearchSection from "../components/Home/SearchSection/SearchSection";
import DailyForecastSection from "../components/Home/DailyForecast/DailyForecast";
import WeatherProvider, { useWeather } from "../context/weatherContext";
import SearchBarProvider from "../context/searchBarContext";
import Stats from "../components/Home/Stats/Stats";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import WeatherBackground from "../components/WeatherBackground";

const HomeScreen = () => {
  const { currentWeather } = useWeather();
  const weatherCode = currentWeather?.weather_code;
  console.warn(weatherCode);
  return (
    <WeatherProvider>
      <View className="flex-1">
        <WeatherBackground weatherCode={weatherCode} />
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
