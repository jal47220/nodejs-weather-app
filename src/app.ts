import { geocode, forecast } from './utils';

const location = 'Los Angeles';

geocode(location, (error: string, data: boolean) => {
    if (error) { console.log('MapBox error: ', error); }
    else if (data) { console.log('MapBox data: ', data); }
    else { console.log('Unknown error retrieving Mapbox data'); }
})

forecast(34.05, -118.24, (error: string, data: boolean) => {
    if (error) { console.log('WeatherStack error: ', error); }
    else if (data) { console.log('WeatherStack data: ', data); }
    else { console.log('Unknown error retrieving WeatherStack data'); }
})

//for (const description of weatherDescriptions){ console.log(`${description}. `); }
//console.log(`It is currently ${actualTemp} degrees F. It feels like ${feelsLikeTemp} degrees F.`);
