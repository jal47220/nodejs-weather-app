import request from 'request';
import * as keys from './keys';
import * as types from './types';

const generateMBApiUrl = (searchedLocation: string, key: string) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchedLocation}.json?access_token=${key}&limit=1`;
const generateWSApiUrl = (key: string, latitude: number, longitude: number) => `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}&units=f`;

export const geocode = (searchedLocation: any, callback: Function) => {
    const mbApiUrl = generateMBApiUrl(encodeURIComponent(searchedLocation), keys.ACCESS_KEY_MB);
 
    request({ url: mbApiUrl, json: true}, (error, response) => {
        if (error) { callback('Unable to connect to mapbox service', undefined); } 
        else if (response.body.features.length === 0) { callback('Unable to find location', undefined); }
        else if (response.body.message) { callback(`Service response: ${response.body.message}`, undefined); }
        else {
            callback(undefined, {
                coordinates: {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0]
                },
                detectedLocation: response.body.features[0].place_name
            });
        }
    });
}

export const forecast = (latitude: number, longitude: number, callback: Function) => {
    const wsApiUrl = generateWSApiUrl(keys.ACCESS_KEY_WS, latitude, longitude);

    request({ url: wsApiUrl, json: true }, (error, response) => {
        if (error) { callback('Unable to connect to weatherstack service', undefined); } 
        else if (response.body.error) { callback(`Service response: ${response.body.error.info}`, undefined); }
        else {
            callback(undefined, {
                weatherDescriptions: response.body.current.weather_descriptions,
                actualTemp: response.body.current.temperature,
                feelsLikeTemp: response.body.current.feelslike
            });
        }
    });
}

export const printWeatherInfo = (searchedLocation: string) => {
    geocode(searchedLocation, (mapBoxError: string, mapBoxData: types.MapBoxObject) => {
        if (mapBoxError) { return console.log('MapBox error: ', mapBoxError); }
        
        console.log(`Detected location: ${mapBoxData.detectedLocation}`); 
        console.log(`Coordinates: ${mapBoxData.coordinates.latitude}, ${mapBoxData.coordinates.longitude}\n`);

        forecast(mapBoxData.coordinates.latitude, mapBoxData.coordinates.longitude, (weatherStackError: string, weatherStackData: types.WeatherStackObject) => {
            if (weatherStackError) { return console.log('WeatherStack error: ', weatherStackError); }

            console.log('Weather description:')
            for (const description of weatherStackData.weatherDescriptions){ console.log(`${description}. `); }
            console.log(`It is currently ${weatherStackData.actualTemp} degrees F. It feels like ${weatherStackData.feelsLikeTemp} degrees F.`);
        });
    });
}