import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { useSearchBar } from "../../../context/searchBarContext";
import { GlassyView } from "../../Glassy";
import { useTheme } from "../../../context/themeContext";
import fetchLocations from "../../../hooks/useFetchLocations";
import { FeatherIcon } from "../../Icon";
export default function SearchBar() {
  const { showSearch, toggleSearch, setLocations } = useSearchBar();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { themeName, theme } = useTheme();
  // TODO: close searchbar automatically when clicked on home view
  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 800); // Wait for one second before updating `debouncedSearch`

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
      style={{
        marginHorizontal: 16,
        flexDirection: "row",
        width: "auto",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingLeft: 80,
        height: 52,
      }}
      alpha={!showSearch ? 0 : 0.5}
    >
      <FeatherIcon
        name="map-pin"
        size={28}
        style={{ display: !showSearch ? "none" : null, marginRight: 8 }}
      />
      <TextInput
        style={{
          fontSize: 18,
          lineHeight: 28,
          height: "100%",
          paddingLeft: 4,
          width: "90%",
          color: theme.text,
          display: !showSearch ? "none" : "",
        }}
        textAlignVertical="center"
        placeholder="Search City"
        placeholderTextColor={theme.accent}
        onChangeText={setSearchText}
        returnKeyType="search"
        value={searchText}
      />
      <TouchableOpacity onPress={() => toggleSearch(!showSearch)}>
        <GlassyView style={{ padding: 12 }} alpha={showSearch ? 0 : 0.6}>
          <FeatherIcon name="search" size={28} />
        </GlassyView>
      </TouchableOpacity>
    </GlassyView>
  );
}
