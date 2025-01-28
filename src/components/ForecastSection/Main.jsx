import { SafeAreaView } from "react-native-safe-area-context";
import DailyForecast from "./DailyForecastSection/Main";
import Stats from "./Stats";

const ForecastSection = () => {
  return (
    <SafeAreaView className="flex-1 justify-end items-center mt-24 w-full">
      <Stats />
      <DailyForecast />
    </SafeAreaView>
  );
};

export default ForecastSection;
