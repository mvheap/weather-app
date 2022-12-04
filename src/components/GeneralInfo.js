import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function GeneralInfo({ cityName, temperature, weatherCode }) {
    function getWeatherIcon() {
        if (weatherCode < 45) {
            return <WbSunnyIcon></WbSunnyIcon>;
        }
        else if (weatherCode >= 45 || weatherCode < 71) {
            return <AirIcon></AirIcon>;
        }
        else if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode === 85 || weatherCode === 86)) {
            return <AcUnitIcon></AcUnitIcon>;
        }
        else {
            return <ThunderstormIcon></ThunderstormIcon>;
        }
    }
    return (
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '36%', maxWidth: '180px' }}>
            < CardContent >
                <Typography variant='h4'>{cityName}</Typography>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                    {getWeatherIcon()}
                    <Typography variant='h5'>{temperature + "ºC"}</Typography>
                </div>
            </CardContent>
        </ Card >
    );
}

export default GeneralInfo;