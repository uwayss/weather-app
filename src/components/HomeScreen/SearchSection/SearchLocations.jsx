import { View, TextInput, TouchableOpacity, Text } from "react-native";
export default function SearchLocations({ locations }) {
  return (
    <View className="flex-column h-fit bg-gray-700 rounded-3xl mx-4 gap-1 overflow-hidden items-center">
      {locations.slice(0, 3).map((location, index) => (
        <TouchableOpacity key={index} className="flex-row items-center">
          <View className="w-full h-full bg-gray-600 pl-5 py-5">
            <Text className="text-white text-2xl">{location}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
