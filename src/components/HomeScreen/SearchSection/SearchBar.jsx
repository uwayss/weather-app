import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function SearchBar({ showSearch, toggleSearch, setLocations }) {
  function handleSearch(e) {
    setLocations([e.nativeEvent.text, "Damascus, Syria 💚"]);
  }
  return (
    <View
      className={`mx-4 rounded-3xl overflow-hidden flex-row w-fit justify-end items-center pl-20 h-16 opacity-70 ${
        showSearch ? "bg-gray-300" : ""
      }`}
    >
      <TextInput
        className="w-full text-lg"
        placeholder="Search City"
        placeholderTextColor={"black"}
        style={{ display: !showSearch ? "none" : null }}
        onChange={handleSearch}
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
        <Icon name="search" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
