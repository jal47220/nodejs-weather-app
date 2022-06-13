import request from 'request';

const generateMBApiUrl = (location : String, key : String) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${key}&limit=1`;
const generateWSApiUrl = (key : String, coordinates : String) => `http://api.weatherstack.com/current?access_key=${key}&query=${coordinates}&units=f`;

const accessKeyMB = 'pk.eyJ1IjoiamFsNDcyMjAiLCJhIjoiY2w0YzNvYjVzMHdlczNwbXo2aGdiamFyYiJ9.ZfPDaqnX1Pl9wW7IlLREpA'
const accessKeyWS = 'eef031e6e5ecfdc56eb63bd19801e497';

const location = 'Los Angeles';
var mbApiUrl = generateMBApiUrl(location, accessKeyMB);
request({ url: mbApiUrl, json: true}, (error, response) => {
    console.log(''); // Line separator
    if (error) { console.log('Unable to connect to mapbox service.'); } 
    else if (response.body.message) { console.log(`Mapbox service error response: ${response.body.message}`); }
    else {
        const latitude = response.body.features[0].center[1];
        const longitude = response.body.features[0].center[0];

        console.log(`${latitude}, ${longitude}`);
    }
}); 

const coordinates = '34.053691, -118.242766';
var wsApiUrl = generateWSApiUrl(accessKeyWS, coordinates);
request({ url: wsApiUrl, json: true }, (error, response) => {
    console.log(''); // Line separator
    if (error) { console.log('Unable to connect to weatherstack service.'); } 
    else if (response.body.error) { console.log(`Weatherstack service error response: ${response.body.error.info}`); }
    else {
        const weatherDescriptions = response.body.current.weather_descriptions;
        const actualTemp = response.body.current.temperature;
        const feelsLikeTemp = response.body.current.feelslike;

        for (const description of weatherDescriptions){ console.log(`${description}. `); }
        console.log(`It is currently ${actualTemp} degrees F. It feels like ${feelsLikeTemp} degrees F.`);
    }
});