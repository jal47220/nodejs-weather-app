import promptSync from 'prompt-sync';
import * as utils from './utils';

type Coordinates = {
    latitude: number,
    longitude: number
}

type MapBoxObject = {
    coordinates: Coordinates,
    location: string
}

type WeatherStackObject = {
    weatherDescriptions: string[], 
    actualTemp: number,
    feelsLikeTemp: number
} 

console.log(''); // Line separator

const prompt = promptSync();
const location = prompt('Please enter a location: ');

console.log(''); // Line separator

utils.geocode(location, (mapBoxError: string, mapBoxData: MapBoxObject) => {
    if (mapBoxError) { return console.log('MapBox error: ', mapBoxError); }
    
    console.log(`${mapBoxData.coordinates.latitude}, ${mapBoxData.coordinates.longitude}`);
    console.log(mapBoxData.location); 

    utils.forecast(mapBoxData.coordinates.latitude, mapBoxData.coordinates.longitude, (weatherStackError: string, weatherStackData: WeatherStackObject) => {
        if (weatherStackError) { return console.log('WeatherStack error: ', weatherStackError); }

        for (const description of weatherStackData.weatherDescriptions){ console.log(`${description}. `); }
        console.log(`It is currently ${weatherStackData.actualTemp} degrees F. It feels like ${weatherStackData.feelsLikeTemp} degrees F.`);
    });
});