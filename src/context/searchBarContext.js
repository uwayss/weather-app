import { createContext, useState, useContext } from "react";

export const SearchBarContext = createContext({
  locations: [],
  setLocations: () => { },
  showSearch: false,
  toggleSearch: () => { },
});

export default function SearchBarContextProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <SearchBarContext.Provider
      value={{
        locations,
        setLocations,
        showSearch,
        toggleSearch: () => setShowSearch(!showSearch),
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}
export const useSearchBar = () => useContext(SearchBarContext); // Create a custom hook