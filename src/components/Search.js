import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { Box } from '@mui/material';

import { useState } from 'react';
import axios from 'axios';

function Search({ setWeatherInfo, setShowInfo, setCityName }) {
    const [countryList, setCountryList] = useState([]);
    const [cityData, setCityData] = useState({});

    function handleInputChange(e, v) {
        if (v === '') {
            setCountryList([]);
        }
        else {
            axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${v}`)
                .then((res) => {
                    if (Object.hasOwn(res.data, 'results')) {
                        setCountryList(res.data.results.map((element) => element))
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    function handleSearch() {
        if (cityData) {
            setCityName(cityData.name);

            const params = {
                latitude: cityData.latitude,
                longitude: cityData.longitude,
                current_weather: true,
                timezone: 'auto',
                hourly: ['apparent_temperature', 'temperature_2m', 'windspeed_10m', 'relativehumidity_2m', 'weathercode', 'pressure_msl'],
                daily: ['sunrise', 'sunset']
            }

            axios.get('https://api.open-meteo.com/v1/forecast', { params })
                .then((res) => {
                    setWeatherInfo(res.data);
                    setShowInfo(true);
                })
                .catch(err => console.log(err));
        }
    }

    function handleClear() {
        setCityData(null);
        setCountryList([]);
        setShowInfo(false);
    }

    return (
        <div className="user-input-container">
            <Autocomplete
                disablePortal
                freeSolo
                id="select-country-box"
                sx={{ width: 300 }}
                options={countryList}
                value={cityData || ''}
                getOptionLabel={(option) => option.name !== undefined ? option.name : ''}
                onChange={(e, v) => setCityData(v)} // Setting the data to the state variable of selected city
                onInputChange={handleInputChange} // Make an API call to get the possible countries
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="Select a Country" />}
                renderOption={(props, option) => {
                    return (
                        <Box component="li" {...props} key={option.id} sx={{ '& > img': { mr: 2 } }}>
                            <img
                                src={`https://hatscripts.github.io/circle-flags/flags/${option.country_code.toLowerCase()}.svg`}
                                width="24"
                                alt=""
                            />
                            {option.name}, {Object.hasOwn(option, 'admin1') ? option.admin1 : option.admin2}
                        </Box>
                    )
                }}
            />
            <div className="button-container">
                <Button variant="contained" onClick={handleSearch}>Search</Button>
                <Button variant="contained" onClick={handleClear}>Clear</Button>
            </div>
        </div>
    );
}

export default Search;