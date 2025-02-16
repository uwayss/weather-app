import React from "react";
import BaseChart from "./BaseChart";
import { transformHourlyDataToChartData } from "@/helpers/weather";
import { GlassyText, GlassyView } from "@/components/Glassy";
import { ReactNode } from "react";
import { barDataItem, stackDataItem } from "react-native-gifted-charts";

export default function HourlyTemperatureGraph({
  data,
}: {
  data: { hour: string; temperature: number }[];
}) {
  const barChartProps = {
    barWidth: 24,
    yAxisLabelWidth: 0,
    initialSpacing: 10,
    endSpacing: 15,
    barInnerComponent: (item: barDataItem | stackDataItem | undefined): ReactNode => {
      return (
        <GlassyView rounded={false}>
          <GlassyText style={{ fontWeight: "bold" }}>{Math.round(item?.value ?? 0)}</GlassyText>
        </GlassyView>
      );
    },
    spacing: 25,
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
