import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function InfoBox({ primaryText, secondaryText }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle1" color="text.primary" component="div">{primaryText}: </Typography>
            <Typography variant="subtitle1" color="text.secondary">{secondaryText}</Typography>
        </Box>);
}

function WeatherChart({ weatherInfo, currentHour }) {
    function getHoursAndMinutes(date) {
        return new Date(date).toLocaleTimeString('en', { hourCycle: 'h24', hour: '2-digit', minute: '2-digit' })
    }
    return (
        < Card sx={{ width: '80%' }}>
            <CardContent sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <InfoBox primaryText="Real Feel" secondaryText={weatherInfo.hourly.apparent_temperature[currentHour] + ' ºC'}></InfoBox>
                <InfoBox primaryText="Wind Speed" secondaryText={weatherInfo.hourly.windspeed_10m[currentHour] + ' km/h'}></InfoBox>
                <InfoBox primaryText="Humidity" secondaryText={weatherInfo.hourly.relativehumidity_2m[currentHour]}></InfoBox>
                <InfoBox primaryText="Pressure" secondaryText={weatherInfo.hourly.pressure_msl[currentHour] + ' hPa'}></InfoBox>
                <InfoBox primaryText="Sunrise" secondaryText={getHoursAndMinutes(weatherInfo.daily.sunrise[0])}></InfoBox>
                <InfoBox primaryText="Sunset" secondaryText={getHoursAndMinutes(weatherInfo.daily.sunset[0])}></InfoBox>
            </CardContent>
        </Card >
    );
}

export default WeatherChart;