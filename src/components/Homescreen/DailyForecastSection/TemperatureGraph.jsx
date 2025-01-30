import { GlassyText, GlassyView } from '../../Glassy'
import { useWeather } from '../../../context/weatherContext';
import { BarChart } from "react-native-gifted-charts";
import { transformWeatherDataToChartData } from "../../../helpers/weather";


function Graph({ data }) {
    const minTemps = []
    data.TemperatureData.forEach(element => {
        minTemps.push(Math.round(element.minTemp) || 0)
    });
    const maxTemps = []
    data.TemperatureData.forEach(element => {
        maxTemps.push(Math.round(element.maxTemp) || 0)
    });
    return (
        <BarChart
            data={transformWeatherDataToChartData(data.TemperatureData)}
            maxValue={Math.max(...maxTemps) + 2}
            mostNegativeValue={!(Math.min(...minTemps) >= 0) ? Math.min(...minTemps) : 0}
            barWidth={24}
            yAxisLabelWidth={0}
            initialSpacing={10}
            endSpacing={15}
            barInnerComponent={({ value }) => {
                return (
                    <GlassyView rounded={false} >
                        <GlassyText className="text-white font-bold">
                            {Math.round(value)}
                        </GlassyText>
                    </GlassyView>
                );
            }}
            spacing={14}
            noOfSections={5}
            showGradient
            yAxisThickness={0}
            xAxisThickness={0}
            yAxisTextStyle={{ color: 'white' }}
            xAxisLabelTextStyle={{ color: 'white' }}
            labelWidth={40}
            lineConfig={{
                shiftY: 15,
                color: '#F29C6E',
                thickness: 3,
                hideDataPoints: true,
                curved: true
            }}
        />
    );
}

export default function TemperatureGraph() {
    const { dailyWeather } = useWeather();
    if (!dailyWeather || !dailyWeather.forecast) {
        return (
            <GlassyView className="p-4 w-11/12 m-2">
                <GlassyText>Precipitation data unavailable.</GlassyText>
            </GlassyView>
        );
    }
    const TemperatureData = dailyWeather.forecast.map(day => ({
        day: new Date(day.time).toLocaleDateString('en-UK', { weekday: 'short' }),
        minTemp: day.minTemperature || 0,
        maxTemp: day.maxTemperature || 0,
    })
    );
    return (
        <GlassyView className="p-4 m-4" transparency={30}>
            <GlassyText className="text-xl font-bold mb-2">Temperature Forecast</GlassyText>
            <Graph data={{ TemperatureData }} />
        </GlassyView>
    )
}