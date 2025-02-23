import { Stack } from "expo-router";
import ThemeProvider from "@/context/themeContext";
import WeatherProvider from "@/context/weatherContext";
export default function RootLayout() {
  // TODO: Implement loading logic. react-native-blurhash
  // TODO: Better error handling
  // TODO: Improve performance and learn caching
  // TODO: Animations
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="[dayId]"
            options={{
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </WeatherProvider>
    </ThemeProvider>
  );
}
