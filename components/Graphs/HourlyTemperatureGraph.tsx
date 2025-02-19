import React from "react";
import BaseChart from "./BaseChart";
import { transformHourlyDataToChartData } from "@/helpers/weather";
import { GlassyText, GlassyView } from "@/components/Glassy";
import { ReactNode } from "react";
import { barDataItem, stackDataItem } from "react-native-gifted-charts";
import { HourlyTemperatureGraphProps } from "@/types/apiTypes";

export default function HourlyTemperatureGraph({ data }: { data: HourlyTemperatureGraphProps }) {
  const barChartProps = {
    barWidth: 24,
    yAxisLabelWidth: 0,
    initialSpacing: 10,
    endSpacing: -5,
    hideRules: true,
    barInnerComponent: (item: barDataItem | stackDataItem | undefined): ReactNode => {
      return (
        <GlassyView rounded={false}>
          <GlassyText style={{ fontWeight: "bold" }}>{Math.round(item?.value ?? 0)}</GlassyText>
        </GlassyView>
      );
    },
    spacing: 20,
    noOfSections: 5,
    showGradient: true,
    labelWidth: 40,
  };

  return (
    <BaseChart
      type="bar"
      data={transformHourlyDataToChartData(data)}
      barChartProps={barChartProps}
    />
  );
}
