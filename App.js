import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import ThemeContextProvider from "./src/context/themeContext";
const Stack = createNativeStackNavigator();
export default function RootStack() {
  return (
    <NavigationContainer>
      <ThemeContextProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </ThemeContextProvider>
    </NavigationContainer>
  );
}
