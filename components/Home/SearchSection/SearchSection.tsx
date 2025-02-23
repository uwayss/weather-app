import SearchBar from "./SearchBar";
import SearchLocations from "./SearchLocations";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchBar } from "@/context/searchBarContext";
import { searchSectionStyles } from "../styles";

export default function SearchSection() {
  const { locations, showSearch } = useSearchBar();
  return (
    <SafeAreaView style={searchSectionStyles.safeContainer}>
      <SearchBar />
      {locations?.length > 0 && showSearch && <SearchLocations />}
    </SafeAreaView>
  );
}
