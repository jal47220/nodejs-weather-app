# nodejs-weather-app

This repo contains an intermediary app created as part of a NodeJS Udemy course.

The intent of this app is to retrieve weather data via MapBox and WeatherStack APIs, and either print this data to the console or send it in JSON format to the browser via a local API server.

In order to run the app:
- First have npm installed.
- Then, run <code>npm run install</code> to install the required dependencies in the project folder. 
- Finally, run <code>npm run dev</code> to run the console version of the app, which prompts for user to input location to determine weather data.
- Alternatively, run <code>npm run start</code> to run the app on a local API server on port 3000. Using this approach, you will need to navigate to <http://localhost:3000/weather?location=>, with the desired location appended to the url, to get weather data.

(Note: <code>npm run</code> is used rather than <code>node dist/app.js </code> to allow scripts from package.json to be ran, including <code>npm run dev</code> and <code>npm run start</code>.)
