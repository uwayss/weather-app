import { View } from "react-native";
import { GlassyText } from "@/components/Glassy";
import { AwesomeIcon } from "@/components/Icon";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 32,
        marginVertical: 12,
      }}>
      <AwesomeIcon name="calendar-days" size={18} />
      <GlassyText style={{ fontSize: 20, lineHeight: 28, fontWeight: "bold" }}>
        Next Days
      </GlassyText>
    </View>
  );
}
