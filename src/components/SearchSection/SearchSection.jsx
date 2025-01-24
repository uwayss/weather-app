import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import SearchLocations from "./SearchLocations";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBarContext } from "../../context/searchBarContext";

export default function SearchSection() {
  const { locations, showSearch } = useContext(SearchBarContext);
  return (
    <SafeAreaView className="h-full gap-5 mt-2 absolute z-10 w-full">
      <SearchBar />
      {locations.length > 0 && showSearch && <SearchLocations />}
    </SafeAreaView>
  );
}
