import React from "react";
import {
  LineChart,
  BarChart,
  LineChartPropsType,
  BarChartPropsType,
} from "react-native-gifted-charts";
import { useTheme } from "@/context/themeContext";
import { Text } from "react-native";

interface BaseChartProps {
  type: "line" | "bar";
  data: any[];
  // Add common chart props here (e.g., colors, grid settings, etc.)
  lineChartProps?: Omit<LineChartPropsType, "data">;
  barChartProps?: Omit<BarChartPropsType, "data">;
}

const chartConfig = {
  barWidth: 24,
  yAxisLabelWidth: 0,
  initialSpacing: 10,
  endSpacing: 15,
  spacing: 25,
  noOfSections: 5,
  showGradient: true,
  labelWidth: 40,
  xAxisThickness: 0,
  yAxisThickness: 0,
  disablePress: true,
};

const BaseChart: React.FC<BaseChartProps> = ({ type, data, lineChartProps, barChartProps }) => {
  const { theme } = useTheme();

  const commonProps = {
    yAxisTextStyle: { color: theme.accent },
    xAxisLabelTextStyle: { color: theme.accent },
    xAxisThickness: 0,
    yAxisThickness: 0,
  };

  if (type === "line") {
    return <LineChart data={data} {...commonProps} {...lineChartProps} />;
  } else if (type === "bar") {
    return <BarChart data={data} {...commonProps} {...chartConfig} {...barChartProps} />;
  } else {
    return <Text>Invalid chart type</Text>;
  }
};

export default BaseChart;
