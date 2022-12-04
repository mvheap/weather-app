import { useState, useMemo, useEffect } from 'react';
import Search from './Search'
import WeatherChart from './WeatherChart';
import GeneralInfo from './GeneralInfo';

function App() {
  const [weatherInfo, setWeatherInfo] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [cityName, setCityName] = useState('');

  const currentHour = useMemo(() => {
    if (weatherInfo !== undefined)
      return new Date(weatherInfo.current_weather.time).toLocaleTimeString('en', { hour: '2-digit', hourCycle: 'h24' })
  }, [weatherInfo]);

  useEffect(() => {
    console.log(weatherInfo);
  }, [weatherInfo]);

  return (
    <>
      <Search setWeatherInfo={setWeatherInfo} setShowInfo={setShowInfo} setCityName={setCityName}></Search>
      {showInfo && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <GeneralInfo cityName={cityName} temperature={weatherInfo.hourly.temperature_2m[currentHour]} weatherCode={weatherInfo.hourly.weathercode[currentHour]}></GeneralInfo>
          <WeatherChart weatherInfo={weatherInfo} currentHour={currentHour}></WeatherChart>
        </div >)
      }
    </>
  );
}

export default App;

