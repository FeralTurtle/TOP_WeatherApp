import { renderData } from './render.js';

const getWeatherData = async () => {
    const locationInput = document.querySelector('#location-input');
    const enteredLocation = locationInput.value;
    const alphabetical = /[A-Za-z]/;
    const fiveNums = /\d{5}/;
    let cityOrState, zipCode;
    if (alphabetical.test(enteredLocation)) {
        cityOrState = true;
    } else if (fiveNums.test(enteredLocation)) {
        zipCode = true;
    };

    //Get location via Geocoding API
    let location;
    try {
        let responseObj;
        if (cityOrState) {
            responseObj = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${enteredLocation}&limit=1&appid=145f93b6e84a1bae5151459d8af682a9`, { mode: 'cors' });
        } else if (zipCode) {
            responseObj = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${enteredLocation}&appid=145f93b6e84a1bae5151459d8af682a9`, { mode: 'cors' });
        };
        location = await responseObj.json();
    } catch (error) {
        console.log('Error: Could not retrieve location data');
    };

    //Get comprehensive weather forecast via One Call API
    let comprehensiveForecast;
    try {
        let responseObj;
        if (cityOrState) {
            responseObj = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location[0].lat}&lon=${location[0].lon}&exclude=minutely&appid=145f93b6e84a1bae5151459d8af682a9&units=imperial`, { mode: 'cors' });
        } else if (zipCode) {
            responseObj = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely&appid=145f93b6e84a1bae5151459d8af682a9&units=imperial`, { mode: 'cors' });
        };
        comprehensiveForecast = await responseObj.json();
    } catch (error) {
        console.log('Error: Could not retrieve weather data');
    };

    console.log(comprehensiveForecast);
    // renderData(); //parameters: comprehensiveForecast, airPollution
};

export { getWeatherData };
