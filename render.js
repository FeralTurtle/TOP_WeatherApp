const getContainers = () => {
    const container1 = document.querySelector('.container-1');
    const weatherAlerts = document.querySelector('.weather-alerts');
    const hourlyForecast = document.querySelector('.hourly-forecast');
    const container3 = document.querySelector('.container-3');
    const container4 = document.querySelector('.container-4');
    const containers = [container1, weatherAlerts, hourlyForecast, container3, container4];
    return containers;
}

const clearPage = () => {
    const containers = getContainers();
    containers.forEach(container => {
        while (container.firstChild) {
            container.firstChild.remove();
        };
    });
};

const renderData = (locationName, weatherData, airPollution) => {
    const loadingAnimation = document.querySelector('.loading-animation');
    clearPage();
    const loadingAnimationText = document.querySelector('.loading-animation > p');
    loadingAnimationText.textContent = 'Rendering page contents...';
    loadingAnimation.style.display = 'block';
    renderContainer1(locationName, weatherData);
    renderContainer2(weatherData);
    renderContainer3(weatherData);
    renderContainer4(airPollution, weatherData);
    loadingAnimation.style.display = 'none';
};

const renderContainer1 = (locationName, weatherData) => {
    const iconCode = weatherData.current.weather[0].icon;
    const feelsLikeTemp = weatherData.current.feels_like;
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
    img.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    infoParagraph1.textContent = weatherData.current.weather[0].description;
    infoParagraph2.textContent = weatherData.current.temp;
    infoParagraph3.textContent = `Feels like: ${feelsLikeTemp}`;
    infoParagraph4.textContent = `Min: ${weatherData.daily[0].temp.min}. Max: ${weatherData.daily[0].temp.max}`;

    tags.forEach(tag => newDiv.append(tag));
    container1.append(newDiv);
};

const renderContainer2 = (weatherData) => {
    const alertsArray = weatherData.alerts;
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
            newLi.textContent = `${weatherData.alerts[i].sender_name}: `;
            const newA = document.createElement('a');
            newA.textContent = weatherData.alerts[i].event;
            newA.addEventListener('click', () => {
                descriptionPopupParagraph.textContent = weatherData.alerts[i].description;
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
    const date = new Date().toLocaleString('en-US', { timeZone: weatherData.timezone });
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
        const iconCode = weatherData.hourly[i].weather[0].icon;
        hrIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        //Degrees
        const degreesDiv = document.createElement('div');
        degreesDiv.textContent = weatherData.hourly[i].temp;

        contentsContainer.append(hourDiv);
        contentsContainer.append(hrIcon);
        contentsContainer.append(degreesDiv);
        hourlyForecast.append(contentsContainer);
    };

    hourlyForecast.style.overflowX = 'scroll';
};

const renderContainer3 = (weatherData) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const container3 = document.querySelector('.container-3');

    for (let i = 0; i < 7; i++) {
        const iconCode = weatherData.daily[i].weather[0].icon;
        const newDiv = document.createElement('div');
        const day = document.createElement('span');
        const img = document.createElement('img');
        const tempRange = document.createElement('div');
        day.textContent = days[i];
        img.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        tempRange.textContent = `${weatherData.daily[i].temp.min} - ${weatherData.daily[i].temp.max}`;
        newDiv.append(day);
        newDiv.append(img);
        newDiv.append(tempRange);
        container3.append(newDiv);
    };
};


const airQualityDescription = (airPollution) => {
    switch (airPollution.list[0].main.aqi) {
        case 1:
            return 'Good';
        case 2:
            return 'Fair';
        case 3:
            return 'Moderate';
        case 4:
            return 'Poor';
        case 5:
            return 'Very Poor';
    };
};

const renderContainer4 = (airPollution, weatherData) => {
    const airQualityIndex = airPollution.list[0].main.aqi;
    const aqDescription = airQualityDescription(airPollution);
    const container4 = document.querySelector('.container-4');
    const p1TextContents = ['Air quality index', 'Wind speed', 'Rain', 'Humidity'];
    const p2TextContents = [`${airQualityIndex} - ${aqDescription}`, `${weatherData.current.wind_speed} metre/sec`, `${weatherData.daily[0].rain} mm`, `${weatherData.current.humidity}%`];

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
