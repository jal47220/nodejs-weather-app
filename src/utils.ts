import request from 'request';
import * as keys from './keys'

const generateMBApiUrl = (location: string, key: string) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${key}&limit=1`;
const generateWSApiUrl = (key: string, latitude: number, longitude: number) => `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}&units=f`;

export const geocode = (address: string, callback: Function) => {
    const mbApiUrl = generateMBApiUrl(encodeURIComponent(address), keys.ACCESS_KEY_MB);
 
    request({ url: mbApiUrl, json: true}, (error, response) => {
        console.log(''); // Line separator
    
        if (error) { callback('Unable to connect to mapbox service.', undefined); } 
        else if (response.body.features.length === 0) { callback('Unable to find location.', undefined); }
        else if (response.body.message) { callback(`Service response: ${response.body.message}`, undefined); }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

export const forecast =  (latitude: number, longitude: number, callback: Function) => {
    const wsApiUrl = generateWSApiUrl(keys.ACCESS_KEY_WS, latitude, longitude);

    request({ url: wsApiUrl, json: true }, (error, response) => {
        console.log(''); // Line separator

        if (error) { callback('Unable to connect to weatherstack service.', undefined); } 
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