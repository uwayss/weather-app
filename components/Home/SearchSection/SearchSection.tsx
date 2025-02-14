import SearchBar from "./SearchBar";
import SearchLocations from "./SearchLocations";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchBar } from "@/context/searchBarContext";

export default function SearchSection() {
  const { locations, showSearch } = useSearchBar();
  return (
    <SafeAreaView
      style={{
        width: "100%",
        gap: 20,
        marginTop: 8,
        zIndex: 10,
        position: "absolute",
      }}
    >
      <SearchBar />
      {locations?.length > 0 && showSearch && <SearchLocations />}
    </SafeAreaView>
  );
}
