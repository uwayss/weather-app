import { LocationAPIResponse } from "@/types/apiTypes";
import { createContext, useState, useContext } from "react";

interface SearchBarContextValue {
  locations: LocationAPIResponse;
  setLocations: (newLocations: LocationAPIResponse) => void;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
  toggleSearch: () => void;
}

export const SearchBarContext = createContext<SearchBarContextValue>({
  locations: [],
  setLocations: () => {},
  showSearch: false,
  setShowSearch: () => {},
  toggleSearch: () => {},
});

export default function SearchBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locations, setLocations] = useState<LocationAPIResponse>([]);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <SearchBarContext.Provider
      value={{
        locations,
        setLocations,
        showSearch,
        setShowSearch,
        toggleSearch: () => setShowSearch(!showSearch),
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}
export const useSearchBar = () => useContext(SearchBarContext); // Create a custom hook
