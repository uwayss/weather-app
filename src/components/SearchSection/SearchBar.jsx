import { useContext, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { SearchBarContext } from "../../context/searchBarContext";
import { GlassyView } from "../Glassy";
import { themeContext } from "../../context/themeContext";
import fetchLocations from "../../hooks/useFetchLocations";

export default function SearchBar() {
  const { showSearch, toggleSearch, setLocations } =
    useContext(SearchBarContext);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { theme } = useContext(themeContext);

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
      className={`mx-4 overflow-hidden flex-row w-fit justify-end items-center pl-20 h-16 ${!showSearch ? "bg-transparent" : ""
        }`}
    >
      <Icon
        name="map-pin"
        size={28}
        color={theme == "dark" ? "black" : "white"}
        className="mr-2"
        style={{ display: !showSearch ? "none" : null }}
      />
      <TextInput
        className={`text-lg h-full pl-1 w-full text-${theme == "light" ? "black" : "white"
          }`}
        textAlignVertical="center"
        placeholder="Search City"
        placeholderTextColor={theme == "light" ? "black" : "white"}
        style={{ display: !showSearch ? "none" : null, width: "90%" }}
        onChangeText={setSearchText}
        returnKeyType="search"
        value={searchText}
      />
      <TouchableOpacity onPress={() => toggleSearch(!showSearch)}>
        <GlassyView className={"p-3 rounded-full"} theme={"trans"}>
          <Icon
            name="search"
            size={28}
            color={theme == "dark" ? "black" : "white"}
          />
        </GlassyView>
      </TouchableOpacity>
    </GlassyView>
  );
}
