import { View, TextInput, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchLocations from "./SearchLocations";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Main() {
  const [locations, setLocations] = useState([]);
  const [showSearch, toggleSearch] = useState(false);
  return (
    <SafeAreaView className="h-full gap-5 mt-2 absolute z-10 w-full">
      <SearchBar
        showSearch={showSearch}
        toggleSearch={toggleSearch}
        setLocations={setLocations}
      />
      {locations.length > 0 && showSearch && (
        <SearchLocations locations={locations} />
      )}
    </SafeAreaView>
  );
}
