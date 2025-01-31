import { GlassyText, GlassyView } from '../Glassy'
import { weatherCodeToCondition } from "../../helpers/weather"
export default function StatsView({ data }) {
    if (data) {
        const { time, weather_code, maxTemperature, minTemperature, precipitation_probability_max, wind_speed_10m_max } = data;
        return (
            <>
                <GlassyView className="p-5 items-start rounded-lg" rounded={false} transparency={40}>
                    <GlassyText className="text-xl font-bold">
                        Temperature: {minTemperature}°C - {maxTemperature}°C
                    </GlassyText>
                </GlassyView>
                <GlassyView className="p-5 items-start rounded-lg" rounded={false} transparency={40}>
                    <GlassyText className="text-xl font-bold">
                        Weather: {weatherCodeToCondition(weather_code)}
                    </GlassyText>
                </GlassyView>
                <GlassyView className="p-5 items-start rounded-lg" rounded={false} transparency={40}>
                    <GlassyText className="text-xl font-bold">
                        Precipitation Probability: {precipitation_probability_max}%
                    </GlassyText>
                </GlassyView>
                <GlassyView className="p-5 items-start rounded-lg" rounded={false} transparency={40}>
                    <GlassyText className="text-xl font-bold">
                        Wind Speed: {wind_speed_10m_max} km/s
                    </GlassyText>
                </GlassyView>
            </>
        )
    } else {
        return (
            <GlassyView className="p-5">
                <GlassyText className="text-xl font-bold text-center">
                    Loading...
                </GlassyText>
            </GlassyView>
        );
    }
}