import { Stack } from "expo-router";
import ThemeProvider from "@/context/themeContext";
import WeatherProvider from "@/context/weatherContext";
import { _View, View, ViewBase } from "react-native";
export default function RootLayout() {
  // TODO: Implement loading logic. react-native-blurhash
  // TODO: Better error handling
  // TODO: Improve performance and learn caching
  // TODO: Animations
  // TODO: Better styling
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Details"
            options={{
              animation: "slide_from_right",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </WeatherProvider>
    </ThemeProvider>
  );
}
