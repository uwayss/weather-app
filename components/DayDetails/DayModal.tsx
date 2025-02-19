import { View, Modal, Pressable, StyleSheet, ScrollView } from "react-native";
import { GlassyView } from "@/components/Glassy";
import WeatherBackground from "../WeatherBackground";
import { DayWeather } from "@/types/apiTypes";
import { useWeather } from "@/context/weatherContext";
import StatsView from "./StatsView";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import { AwesomeIcon } from "@/components/Icon";
function CloseButton({ toggleVisibility }: { toggleVisibility: () => void }) {
  return (
    <Pressable style={styles.button} onPress={toggleVisibility}>
      <AwesomeIcon name="arrow-left" size={32} />
    </Pressable>
  );
}
type DayModalProps = {
  modalVisible: boolean;
  toggleVisibility: () => void;
  data: DayWeather;
};
export default function DayModal(props: DayModalProps) {
  const isCurrentlyDay = useWeather().currentWeather?.isDay;
  const { modalVisible, toggleVisibility, data } = props;
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={false}
      visible={modalVisible}
      onRequestClose={toggleVisibility}>
      <View style={styles.container}>
        <WeatherBackground weatherCode={data.weather_code} isDay={isCurrentlyDay} />
        <ScrollView style={{ height: "100%", width: "100%" }}>
          <GlassyView rounded={false} style={styles.safeContainer} isTransparent>
            {data && <StatsView dayData={data} />}
            {data && <HourlyForecast time={data.time} />}
          </GlassyView>
        </ScrollView>
        <CloseButton toggleVisibility={toggleVisibility} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 12,
    padding: 8,
    backgroundColor: "rgba(126,126,126,0.1)",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  safeContainer: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 16,
    gap: 20,
  },
});
