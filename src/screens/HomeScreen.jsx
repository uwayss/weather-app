import { View, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import SearchSection from "../components/Homescreen/SearchSection/SearchSection";
import DailyForecastSection from "../components/Homescreen/DailyForecastSection/DailyForecastSection";
import WeatherProvider from "../context/weatherContext";
import SearchBarProvider from "../context/searchBarContext";
import Stats from "../components/Homescreen/Stats";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  // TODO: fix the ui messing up when keyboard is on
  return (
    <WeatherProvider>
      <View className="flex-1">
        <Image
          source={require("../../assets/backgrounds/clear_night.jpg")}
          className="w-full h-full absolute"
          fadeDuration={50}
          blurRadius={15}
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
        <StatusBar style="auto" />
      </View>
    </WeatherProvider>
  );
};

export default HomeScreen;
