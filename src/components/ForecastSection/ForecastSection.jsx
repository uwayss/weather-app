import React, { useContext } from "react";
import { WeatherContext } from "../../context/weatherContext";
import { SafeAreaView } from "react-native-safe-area-context";
import DailyForecast from "./DailyForecast";
import Stats from "./Stats";
import { GlassyText, GlassyView } from "../Glassy";
import { themeContext } from "../../context/themeContext";

const ForecastSection = () => {
  const { theme } = useContext(themeContext);
  return (
    <SafeAreaView className="flex-1 justify-end items-center mt-24 w-full">
      <Stats />
      <DailyForecast />
    </SafeAreaView>
  );
};

export default ForecastSection;
