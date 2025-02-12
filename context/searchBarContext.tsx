import { createContext, useState, useContext } from "react";
interface SearchBarContextValue {
  locations: string[];
  setLocations: React.Dispatch<React.SetStateAction<never[]>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSearch: () => void;
}
type ProviderProps = {
  children: React.ReactNode;
};
export const SearchBarContext = createContext<
  SearchBarContextValue | undefined
>(undefined);

export default function SearchBarProvider({ children }: ProviderProps) {
  const [locations, setLocations] = useState([]);
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
