import { Stack } from "expo-router";
import ThemeProvider from "../context/themeContext"
import WeatherProvider from "../context/weatherContext";
const RootLayout = () => {
    return (
        <ThemeProvider>
            <WeatherProvider>
                <Stack screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="dayDetails"
                        options={{
                            animation: "slide_from_right",
                        }}
                    />
                </Stack>
            </WeatherProvider>
        </ThemeProvider>
    )
}

export default RootLayout