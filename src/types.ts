export type Coordinates = {
    latitude: number,
    longitude: number
}

export type MapBoxObject = {
    coordinates: Coordinates,
    detectedLocation: string
}

export type WeatherStackObject = {
    weatherDescriptions: string[], 
    actualTemp: number,
    feelsLikeTemp: number
} 