import React, { useMemo } from "react";
import BaseChart from "./BaseChart";
import { calculateMinMax, transformWeatherDataToChartData } from "@/helpers/weather";
import { GlassyText, GlassyView } from "@/components/Glassy";
import { ReactNode } from "react";
import { barDataItem, stackDataItem } from "react-native-gifted-charts";

export default function DailyTemperatureGraph({
  data,
}: {
  data: { day: string; minTemp: number; maxTemp: number }[];
}) {
  const { max, min } = useMemo(() => calculateMinMax(data), [data]);

  const barChartProps = {
    maxValue: max + 2,
    mostNegativeValue: !(min >= 0) ? min : 0,
    barWidth: 24,
    yAxisLabelWidth: 0,
    initialSpacing: 10,
    endSpacing: 15,
    barInnerComponent: (item: barDataItem | undefined | stackDataItem): ReactNode => {
      return (
        <GlassyView rounded={false}>
          <GlassyText style={{ fontWeight: "bold" }}>
            {Math.round((item as any)?.value ?? 0)}
          </GlassyText>
        </GlassyView>
      );
    },
    spacing: 14,
    noOfSections: 5,
    showGradient: true,
    hideRules: true,
    labelWidth: 40,
  };

  return (
    <BaseChart
      type="bar"
      data={transformWeatherDataToChartData(data)}
      barChartProps={barChartProps}
    />
  );
}
