import { useContext, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { SearchBarContext } from "../../context/searchBarContext";
import { GlassyText, GlassyView } from "../Glassy";
import { themeContext } from "../../context/themeContext";
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
    }, 500); // Wait 500ms before updating `debouncedSearch`

    return () => clearTimeout(handler); // Cleanup on unmount or input change
  }, [searchText]);

  // Fetch locations when debouncedSearch changes
  useEffect(() => {
    async function getLocations() {
      if (!debouncedSearch.trim()) return;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=3&q=${encodeURIComponent(
            debouncedSearch
          )}`,
          {
            headers: {
              "User-Agent":
                "MuhammedsWeatherApp/1.0 (mamipromax1513@gmail.com)",
            },
          }
        );

        if (!response.ok) {
          console.error("HTTP Error:", response.status, response.statusText);
          return;
        }

        const body = await response.json();
        setLocations(body);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    getLocations();
  }, [debouncedSearch]);
  return (
    <GlassyView
      theme={theme}
      className={`mx-4 overflow-hidden flex-row w-fit justify-end items-center pl-20 h-16 ${
        !showSearch ? "bg-transparent" : ""
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
        className={`text-lg h-full pl-1 w-full text-${
          theme == "light" ? "black" : "white"
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
