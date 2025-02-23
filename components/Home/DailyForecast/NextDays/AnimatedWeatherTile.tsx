import React, { useState, useEffect } from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import DailyWeatherTile from "./DailyWeatherTile";
import { DayWeather } from "@/types/apiTypes";

export default function AnimatedWeatherTile({ data, index }: { data: DayWeather; index: number }) {
  return (
    <Animated.View
      entering={FadeInRight.duration(600)
        .delay(index * 100)
        .springify()
        .damping(10)}
    >
      <DailyWeatherTile data={data} />
    </Animated.View>
  );
}
