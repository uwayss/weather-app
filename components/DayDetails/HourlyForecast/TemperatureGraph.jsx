import { GlassyText, GlassyView } from "../../Glassy";
import { useWeather } from "../../../context/weatherContext";
import { BarChart } from "react-native-gifted-charts";
import { transformHourlyDataToChartData } from "../../../helpers/weather";
import { themeContext, useTheme } from "../../../context/themeContext";

function Graph({ data }) {
  const { theme } = useTheme();
  return (
    <BarChart
      data={transformHourlyDataToChartData(data.TemperatureData)}
      barWidth={24}
      yAxisLabelWidth={0}
      initialSpacing={10}
      endSpacing={15}
      barInnerComponent={({ value }) => {
        return (
          <GlassyView rounded={false}>
            <GlassyText className="font-bold">{Math.round(value)}</GlassyText>
          </GlassyView>
        );
      }}
      spacing={25}
      noOfSections={5}
      showGradient
      yAxisThickness={0}
      xAxisThickness={0}
      yAxisTextStyle={{ color: theme.accent }}
      xAxisLabelTextStyle={{ color: theme.accent }}
      labelWidth={40}
      lineConfig={{
        shiftY: 15,
        color: "#F29C6E",
        thickness: 3,
        hideDataPoints: true,
        curved: true,
      }}
    />
  );
}

export default function TemperatureGraph({ data }) {
  if (!data) {
    return (
      <GlassyView className="p-4 w-11/12 m-2">
        <GlassyText>Precipitation data unavailable.</GlassyText>
      </GlassyView>
    );
  }
  const TemperatureData = data.map((hour) => ({
    hour:
      new Date(hour.time).getHours().toString().padStart(2, "0") +
      ":" +
      new Date(hour.time).getMinutes().toString().padStart(2, "0"),
    temperature: hour.temperature,
  }));
  return (
    <GlassyView className="p-4 m-4">
      <GlassyText className="text-xl font-bold mb-2">
        Temperature Forecast
      </GlassyText>
      <Graph data={{ TemperatureData }} />
    </GlassyView>
  );
}
