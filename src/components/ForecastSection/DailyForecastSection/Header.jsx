import { View } from "react-native";
import { GlassyText } from "../../Glassy";
import { FontAwesome6 } from "react-native-vector-icons";

export default function Header() {
  return (
    <View className="flex-row justify-center items-center gap-4 px-6">
      <FontAwesome6 name="calendar-days" color="white" size={18} />
      <GlassyText className="text-2xl font-bold">
        Next Days
      </GlassyText>
    </View>
  );
}
