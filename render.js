import { changeBackground, clearPage, airQualityDescription } from './renderHelpers.js';

const renderData = (locationName, weatherForecast, airPollution) => {
    const loadingAnimation = document.querySelector('.loading-animation');
    clearPage();
    changeBackground(weatherForecast);
    const loadingAnimationText = document.querySelector('.loading-animation > p');
    loadingAnimationText.textContent = 'Rendering page contents...';
    loadingAnimation.style.display = 'block';
    renderContainer1(locationName, weatherForecast);
    renderContainer2(weatherForecast);
    renderContainer3(weatherForecast);
    renderContainer4(airPollution, weatherForecast);
    loadingAnimation.style.display = 'none';
};

const renderContainer1 = (locationName, weatherForecast) => {
    const iconCode = weatherForecast.current.weather[0].icon;
    const feelsLikeTemp = weatherForecast.current.feels_like;
    const container1 = document.querySelector('.container-1');
    const newDiv = document.createElement('div');
    newDiv.classList.add('info');
    const cityName = document.createElement('p');
    const img = document.createElement('img');
    const infoParagraph1 = document.createElement('p');
    const infoParagraph2 = document.createElement('p');
    const infoParagraph3 = document.createElement('p');
    const infoParagraph4 = document.createElement('p');
    const tags = [cityName, img, infoParagraph1, infoParagraph2, infoParagraph3, infoParagraph4];

    cityName.textContent = locationName;
    img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    infoParagraph1.textContent = weatherForecast.current.weather[0].description;
    infoParagraph2.textContent = weatherForecast.current.temp;
    infoParagraph3.textContent = `Feels like: ${feelsLikeTemp}`;
    infoParagraph4.textContent = `Min: ${weatherForecast.daily[0].temp.min}. Max: ${weatherForecast.daily[0].temp.max}`;

    tags.forEach(tag => newDiv.append(tag));
    container1.append(newDiv);
};

const renderContainer2 = (weatherForecast) => {
    const alertsArray = weatherForecast.alerts;
    const weatherAlerts = document.querySelector('.weather-alerts');
    const descriptionPopup = document.querySelector('.description-popup');
    const descriptionPopupParagraph = document.querySelector('.description-popup > p');
    const popupClose = document.querySelector('.popup-close > span:nth-child(1)');
    const hourlyForecast = document.querySelector('.hourly-forecast');

    //Weather alerts
    if (alertsArray) {
        const newLi = document.createElement('li');
        newLi.textContent = 'WEATHER ALERT:';
        weatherAlerts.append(newLi);
        for (let i = 0; i < alertsArray.length; i++) {
            const newLi = document.createElement('li');
            newLi.textContent = `${weatherForecast.alerts[i].sender_name}: `;
            const newA = document.createElement('a');
            newA.textContent = weatherForecast.alerts[i].event;
            newA.addEventListener('click', () => {
                descriptionPopupParagraph.textContent = weatherForecast.alerts[i].description;
                descriptionPopup.style.display = 'block';
            });
            newLi.append(newA);
            weatherAlerts.append(newLi);
        };
    };
    popupClose.addEventListener('click', () => {
        descriptionPopup.style.display = 'none';
    });

    //Hourly forecast
    const date = new Date().toLocaleString('en-US', { timeZone: weatherForecast.timezone });
    const hour = new Date(date);
    let hourInt = hour.getHours();
    for (let i = 0; i < 24; i++) {
        const contentsContainer = document.createElement('div');
        //Hour
        const hourDiv = document.createElement('div');
        if (hourInt == 24) {
            hourInt = 0;
        };
        hourDiv.textContent = `${hourInt}:00`;
        hourInt++;
        //Icon
        const hrIcon = document.createElement('img');
        const iconCode = weatherForecast.hourly[i].weather[0].icon;
        hrIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        //Degrees
        const degreesDiv = document.createElement('div');
        degreesDiv.textContent = weatherForecast.hourly[i].temp;

        contentsContainer.append(hourDiv);
        contentsContainer.append(hrIcon);
        contentsContainer.append(degreesDiv);
        hourlyForecast.append(contentsContainer);
    };

    hourlyForecast.style.overflowX = 'scroll';
};

const renderContainer3 = (weatherForecast) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const container3 = document.querySelector('.container-3');

    for (let i = 0; i < 7; i++) {
        const iconCode = weatherForecast.daily[i].weather[0].icon;
        const newDiv = document.createElement('div');
        const day = document.createElement('span');
        const img = document.createElement('img');
        const tempRange = document.createElement('div');
        day.textContent = days[i];
        img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        tempRange.textContent = `${weatherForecast.daily[i].temp.min} - ${weatherForecast.daily[i].temp.max}`;
        newDiv.append(day);
        newDiv.append(img);
        newDiv.append(tempRange);
        container3.append(newDiv);
    };
};

const renderContainer4 = (airPollution, weatherForecast) => {
    const airQualityIndex = airPollution.list[0].main.aqi;
    const aqDescription = airQualityDescription(airPollution);
    const container4 = document.querySelector('.container-4');
    const p1TextContents = ['Air quality index', 'Wind speed', 'Rain', 'Humidity'];
    const p2TextContents = [`${airQualityIndex} - ${aqDescription}`, `${weatherForecast.current.wind_speed} metre/sec`, `${weatherForecast.daily[0].rain} mm`, `${weatherForecast.current.humidity}%`];

    for (let i = 0; i < 4; i++) {
        const newDiv = document.createElement('div');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        p1.textContent = p1TextContents[i];
        p2.textContent = p2TextContents[i];
        newDiv.append(p1);
        newDiv.append(p2);
        container4.append(newDiv);
    };
};

export { renderData };
