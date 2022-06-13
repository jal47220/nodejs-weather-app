import request from 'request';

const generateApiUrl = (key : String, coordinates : String) => `http://api.weatherstack.com/current?access_key=${key}&query=${coordinates}&units=f`;

const accessKey = 'eef031e6e5ecfdc56eb63bd19801e497';
const alcaCoord = '37.8267,-122.4233';

var apiUrl = generateApiUrl(accessKey, alcaCoord);
console.log(''); // Line separator
request({ url: apiUrl, json: true }, (_error, response) => {
    const weatherDescriptions = response.body.current.weather_descriptions;
    const actualTemp = response.body.current.temperature;
    const feelsLikeTemp = response.body.current.feelslike;

    for (const description of weatherDescriptions){ console.log(`${description}. `); }
    console.log(`It is currently ${actualTemp} degrees F. It feels like ${feelsLikeTemp} degrees F.`);
});