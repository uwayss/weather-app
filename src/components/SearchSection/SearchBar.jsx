import { useContext, useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { SearchBarContext } from "../../context/searchBarContext";

export default function SearchBar() {
  const { showSearch, toggleSearch, setLocations } =
    useContext(SearchBarContext);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
    <View
      className={`mx-4 rounded-3xl overflow-hidden flex-row w-fit justify-end items-center pl-20 h-16 ${
        showSearch ? "bg-gray-300/70" : ""
      }`}
    >
      <Icon
        name="map-pin"
        size={28}
        color={"black"}
        className="mr-2"
        style={{ display: !showSearch ? "none" : null }}
      />
      <TextInput
        className="text-lg h-full pl-1 w-full"
        textAlignVertical="center"
        placeholder="Search City"
        placeholderTextColor={"black"}
        style={{ display: !showSearch ? "none" : null, width: "90%" }}
        onChangeText={setSearchText}
        value={searchText}
      />
      <TouchableOpacity
        onPress={() => toggleSearch(!showSearch)}
        style={{
          backgroundColor: !showSearch
            ? "rgba(255,255,255,0.3)"
            : "transparent",
        }}
        className="rounded-full p-3"
      >
        <Icon name="search" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}
