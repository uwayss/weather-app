import { useLocalSearchParams } from "expo-router";
import { Text, ScrollView, SafeAreaView } from "react-native";

export default function nextDays() {
    const params = useLocalSearchParams();
    const { time, weather_code, maxTemperature, minTemperature, precipitation_probability_max, wind_speed_10m_max } = params;
    return (
        <SafeAreaView className="flex-1 bg-slate-800">
            <ScrollView className="flex-1 p-4">
                <Text className="text-white text-2xl font-bold text-center mb-4">
                    Detailed Weather for {time}
                </Text>
                <Text className="text-white">
                    Temperature: {minTemperature}°C - {maxTemperature}°C
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}