import { View } from "react-native";
import { GlassyText } from "../../Glassy";
import { AwesomeIcon } from "../../Icon";

export default function Header() {
  return (
    <View className="flex-row justify-center items-center gap-4 px-8 my-3">
      <AwesomeIcon name="calendar-days" size={18} />
      <GlassyText className="text-xl font-bold">Next Days</GlassyText>
    </View>
  );
}
