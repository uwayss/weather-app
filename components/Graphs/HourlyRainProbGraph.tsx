import React from "react";
import BaseChart from "./BaseChart";
import { processPrecipitationData } from "@/helpers/weather";
import { useTheme } from "@/context/themeContext";
import { HourlyRainProbGraphProps } from "@/types/apiTypes";

export default function HourlyRainProbGraph({ data }: { data: HourlyRainProbGraphProps }) {
  const currentData = processPrecipitationData(data, "hourly");
  const { theme } = useTheme();

  const lineChartProps = {
    areaChart: true,
    dataPointsColor: "lightblue",
    lineGradient: true,
    lineGradientStartColor: "white",
    lineGradientEndColor: "lightblue",
    thickness: 5,
    hideRules: true,
    startOpacity: 1,
    endOpacity: 0,
    initialSpacing: 20,
    endSpacing: -30,
    noOfSections: 6,
    yAxisLabelSuffix: "%",
    yAxisTextStyle: { color: theme.accent },
    xAxisLabelTextStyle: { color: theme.accent },
    yAxisThickness: 0,
    xAxisThickness: 0,
  };

  return <BaseChart type="line" data={currentData} lineChartProps={lineChartProps} />;
}
