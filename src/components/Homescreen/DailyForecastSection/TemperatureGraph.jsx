import { GlassyText, GlassyView } from '../../Glassy'
import { useWeather } from '../../../context/weatherContext';
import { BarChart } from "react-native-gifted-charts";
import { transformWeatherDataToChartData } from "../../../helpers/weather";


function Graph({ data }) {

    return (
        <BarChart
            data={transformWeatherDataToChartData(data.TemperatureData)}
            barWidth={16}
            initialSpacing={10}
            spacing={14}
            barBorderRadius={4}
            showGradient
            yAxisThickness={0}
            xAxisType={'dashed'}
            xAxisColor={'lightgray'}
            yAxisTextStyle={{ color: 'white', fontWeight: 'bold' }}
            xAxisLabelTextStyle={{ color: 'white', fontWeight: 'bold' }}
            noOfSections={8}
            labelWidth={40}
            showLine={true}
            lineConfig={{
                color: '#F29C6E',
                thickness: 3,
                hideDataPoints: true,
                curved: true
            }}
        />
    );
}

export default function PrecipitationGraph() {
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