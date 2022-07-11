import express from 'express';
import { geocode, forecast } from './utils';
import * as types from './types';

const app = express();
const port = 3000;

app.get('/weather', (req, res) => {
    const searchedLocation = req.query.location;
    if (!searchedLocation) { return res.send({ error: 'You must provide a location' }); }
    
    return geocode(searchedLocation, (mapBoxError: string, mapBoxData: types.MapBoxObject) => { 
        if (mapBoxError) {
            return res.send({
                error: mapBoxError,
                searchedLocation: searchedLocation
            });
        }

        return forecast(mapBoxData.coordinates.latitude, mapBoxData.coordinates.longitude, (weatherStackError: string, weatherStackData: types.WeatherStackObject) => {
            if (weatherStackError) {
                return res.send({
                    error: weatherStackError,
                    detectedLocation: mapBoxData.detectedLocation,
                    latitude: mapBoxData.coordinates.latitude, 
                    longitude: mapBoxData.coordinates.longitude,
                    searchedLocation: searchedLocation
                });
            }

            return res.send({
                forecast: weatherStackData.weatherDescriptions,
                detectedLocation: mapBoxData.detectedLocation,
                latitude: mapBoxData.coordinates.latitude, 
                longitude: mapBoxData.coordinates.longitude,
                searchedLocation: searchedLocation
            });
        });
    });
});

app.listen(port, () => { console.log(`Server is running at https://localhost:${port}`) });