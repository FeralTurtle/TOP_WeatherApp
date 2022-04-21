const getWeatherData = async () => {
    const locationInput = document.querySelector('#location-input');
    const loadingAnimation = document.querySelector('.loading-animation');
    const loadingAnimationText = document.querySelector('.loading-animation > p');
    const enteredLocation = locationInput.value;
    const alphabetical = /[A-Za-z]/;
    const fiveNums = /\d{5}/;
    let cityOrState, zipCode;
    if (alphabetical.test(enteredLocation)) {
        cityOrState = true;
    } else if (fiveNums.test(enteredLocation)) {
        zipCode = true;
    };

    loadingAnimationText.textContent = 'Fetching weather data...';
    loadingAnimation.style.display = 'block';

    //Get location via Geocoding API
    let location;
    let locationName;
    try {
        let responseObj;
        if (cityOrState) {
            responseObj = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${enteredLocation}&limit=1&appid=145f93b6e84a1bae5151459d8af682a9`, { mode: 'cors' });
        } else if (zipCode) {
            responseObj = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${enteredLocation}&appid=145f93b6e84a1bae5151459d8af682a9`, { mode: 'cors' });
        };
        location = await responseObj.json();
        (cityOrState) ? locationName = location[0].name : locationName = location.name;
    } catch (error) {
        loadingAnimation.style.display = 'none';
        console.log('Error: Could not retrieve location data');
        return;
    };

    //Get comprehensive weather forecast via One Call API
    let weatherForecast;
    try {
        let responseObj;
        if (cityOrState) {
            responseObj = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location[0].lat}&lon=${location[0].lon}&exclude=minutely&appid=145f93b6e84a1bae5151459d8af682a9&units=imperial`, { mode: 'cors' });
        } else if (zipCode) {
            responseObj = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely&appid=145f93b6e84a1bae5151459d8af682a9&units=imperial`, { mode: 'cors' });
        };
        weatherForecast = await responseObj.json();
    } catch (error) {
        loadingAnimation.style.display = 'none';
        console.log('Error: Could not retrieve weather data');
        return;
    };

    //Get air pollution data vs Air Pollution API
    let airPollution;
    try {
        let responseObj;
        if (cityOrState) {
            responseObj = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${location[0].lat}&lon=${location[0].lon}&appid=145f93b6e84a1bae5151459d8af682a9&units=imperial`, { mode: 'cors' });
        } else if (zipCode) {
            responseObj = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=145f93b6e84a1bae5151459d8af682a9&units=imperial`, { mode: 'cors' });
        };
        airPollution = await responseObj.json();
    } catch (error) {
        loadingAnimation.style.display = 'none';
        console.log('Error: Could not retrieve air pollution data');
        return;
    };

    console.log(weatherForecast);
    loadingAnimation.style.display = 'none';

    const weatherData = [locationName, weatherForecast, airPollution];
    return weatherData;
};

export { getWeatherData };
