import SearchSection from "@/components/Home/SearchSection/SearchSection";
import WeatherProvider, { useWeather } from "@/context/weatherContext";
import MainSection from "@/components/Home/MainSection/MainSection";
import WeatherBackground from "@/components/WeatherBackground";
import SearchBarProvider from "@/context/searchBarContext";
import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  const { currentWeather } = useWeather();
  const { weatherCode, isDay } = currentWeather || {};
  const backgroundProps = weatherCode && isDay ? { weatherCode, isDay } : {};

  return (
    <WeatherProvider>
      <View style={{ height: "100%", width: "100%" }}>
        <WeatherBackground {...backgroundProps} />
        <SearchBarProvider>
          <ScrollView style={{ flex: 1 }}>
            <SearchSection />
            <MainSection />
          </ScrollView>
        </SearchBarProvider>
      </View>
      <StatusBar style="auto" />
    </WeatherProvider>
  );
};

export default HomeScreen;
