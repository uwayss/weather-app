import { View } from "react-native";
import { GlassyText } from "@/components/Glassy";
import { AwesomeIcon } from "@/components/Icon";
import { headerStyles } from "../styles";

export default function Header() {
  return (
    <View style={headerStyles.container}>
      <AwesomeIcon name="calendar-days" size={18} />
      <GlassyText style={headerStyles.text}>Next Days</GlassyText>
    </View>
  );
}
