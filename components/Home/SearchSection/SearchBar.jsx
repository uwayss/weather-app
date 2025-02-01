import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useSearchBar } from "../../../context/searchBarContext";
import { GlassyView } from "../../Glassy";
import { useTheme } from "../../../context/themeContext";
import fetchLocations from "../../../hooks/useFetchLocations";

export default function SearchBar() {
  const { showSearch, toggleSearch, setLocations } = useSearchBar();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { themeName, theme } = useTheme();

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 1000); // Wait for one second before updating `debouncedSearch`

    return () => clearTimeout(handler); // Cleanup on unmount or input change
  }, [searchText]);

  // Fetch locations when debouncedSearch changes
  useEffect(() => {
    async function getLocations() {
      if (!debouncedSearch.trim()) return;
      const newLocations = await fetchLocations(
        encodeURIComponent(debouncedSearch)
      );
      setLocations(newLocations);
    }

    getLocations();
  }, [debouncedSearch]);

  return (
    <GlassyView
      className={`mx-4 overflow-hidden flex-row w-fit justify-end items-center pl-20 h-16`} transparency={!showSearch ? 0 : 50}
    >
      <Icon
        name="map-pin"
        size={28}
        color={theme.accent}
        className="mr-2"
        style={{ display: !showSearch ? "none" : null }}
      />
      <TextInput
        className={`text-lg h-full pl-1 w-[90%] text-${theme.accent} ${!showSearch ? "hidden" : ""}`}
        textAlignVertical="center"
        placeholder="Search City"
        placeholderTextColor={theme.accent}
        onChangeText={setSearchText}
        returnKeyType="search"
        value={searchText}
      />
      <TouchableOpacity onPress={() => toggleSearch(!showSearch)}>
        <GlassyView className="p-3 rounded-full" transparent={showSearch ? 0 : 50}>
          <Icon
            name="search"
            size={28}
            color={theme.accent}
          />
        </GlassyView>
      </TouchableOpacity>
    </GlassyView >
  );
}
