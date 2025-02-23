import { GlassyView } from "../Glassy";
import DailyForecast from "../Home/DailyForecast/DailyForecast";
import Stats from "../Home/Stats";
import { useSearchBar } from "../../context/searchBarContext";
import { mainSectionStyles } from "./styles";

export default function MainSection() {
  const { setShowSearch } = useSearchBar();
  return (
    <GlassyView
      style={mainSectionStyles.safeContainer}
      safe
      isTransparent
      onPressNoFeedback={() => setShowSearch(false)}
    >
      <Stats />
      <DailyForecast />
    </GlassyView>
  );
}
