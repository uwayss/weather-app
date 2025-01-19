import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-emerald-500 justify-center items-center">
      <Text className="text-white text-3xl">Hello World!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;
