import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { useSearchBar } from "@/context/searchBarContext";
import { GlassyView } from "@/components/Glassy";
import { useTheme } from "@/context/themeContext";
import fetchLocations from "@/hooks/useFetchLocations";
import { FeatherIcon } from "@/components/Icon";
import useDebounce from "@/hooks/useDebounce"; // Import the debounce hook
import { searchBarStyles } from "../styles";
export default function SearchBar() {
  const { showSearch, toggleSearch, setLocations } = useSearchBar();
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 800); // Use the debounce hook
  const { theme } = useTheme();

  // Fetch locations when debouncedSearch changes
  useEffect(() => {
    async function getLocations() {
      if (!debouncedSearch.trim()) return;
      const newLocations = await fetchLocations(encodeURIComponent(debouncedSearch));
      setLocations(newLocations);
    }

    getLocations();
  }, [debouncedSearch, setLocations]);

  return (
    <GlassyView style={searchBarStyles.container} alpha={!showSearch ? 0 : 0.5}>
      <FeatherIcon
        name="map-pin"
        size={28}
        style={{ display: !showSearch ? "none" : undefined, marginRight: 8 }}
      />
      <TextInput
        style={[
          searchBarStyles.inputStyles,
          { color: theme.text, display: !showSearch ? "none" : undefined },
        ]}
        textAlignVertical="center"
        placeholder="Search City"
        placeholderTextColor={theme.accent}
        onChangeText={setSearchText}
        returnKeyType="search"
        value={searchText}
      />
      <TouchableOpacity onPress={toggleSearch}>
        <GlassyView style={searchBarStyles.searchIconContainer} alpha={showSearch ? 0 : 0.6}>
          <FeatherIcon name="search" size={28} />
        </GlassyView>
      </TouchableOpacity>
    </GlassyView>
  );
}
