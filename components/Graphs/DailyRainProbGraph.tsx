import React from "react";
import BaseChart from "./BaseChart";
import { processPrecipitationData } from "@/helpers/weather";
import { useTheme } from "@/context/themeContext";
import { RainProbGraphProps } from "@/types/apiTypes";

type Props = {
  data: RainProbGraphProps;
};

function DailyRainProbGraph({ data }: Props) {
  const currentData = processPrecipitationData(data);
  const { theme } = useTheme();

  const lineChartProps = {
    areaChart: true,
    dataPointsColor: "lightblue",
    dataPointsShape: "",
    lineGradient: true,
    showScrollIndicator: true,
    lineGradientStartColor: "white",
    lineGradientEndColor: "lightblue",
    thickness: 3,
    startOpacity: 1,
    endOpacity: 0,
    initialSpacing: 15,
    endSpacing: -40,
    noOfSections: 6,
    hideRules: true,
    yAxisLabelSuffix: "%",
    xAxisLabelTextStyle: { color: theme.accent },
    yAxisTextStyle: { color: theme.accent },
    xAxisThickness: 0,
    yAxisThickness: 0,
  };

  return <BaseChart type="line" data={currentData} lineChartProps={lineChartProps} />;
}

export default React.memo(DailyRainProbGraph);
