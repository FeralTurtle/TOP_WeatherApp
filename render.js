const renderData = (locationName, weatherData) => {
    console.log('render data');
    renderContainer1(locationName, weatherData);
    renderContainer2(weatherData);
};

const renderContainer1 = (locationName, weatherData) => {
    console.log('render container 1');
    const iconCode = weatherData.current.weather[0].icon;
    const cityName = document.querySelector('.container-1 > p:nth-child(1)');
    const img = document.querySelector('.container-1 > img:nth-child(2)');
    const infoParagraph1 = document.querySelector('.container-1 > .info > p:nth-child(1)');
    const infoParagraph2 = document.querySelector('.container-1 > .info > p:nth-child(2)');
    const infoParagraph3 = document.querySelector('.container-1 > .info > p:nth-child(3)');

    cityName.textContent = locationName;
    img.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    infoParagraph1.textContent = weatherData.current.temp;
    infoParagraph2.textContent = weatherData.current.weather[0].description;
    infoParagraph3.textContent = `Min: ${weatherData.daily[0].temp.min}. Max: ${weatherData.daily[0].temp.max}`;
};

const renderContainer2 = (weatherData) => {
    console.log('render container 2');
    const alertsArray = weatherData.alerts;
    const weatherAlerts = document.querySelector('.weather-alerts');
    const descriptionPopup = document.querySelector('.description-popup');
    const descriptionPopupParagraph = document.querySelector('.description-popup > p');
    const popupClose = document.querySelector('.popup-close > span:nth-child(1)');
    const hourlyForecast = document.querySelector('.hourly-forecast');

    while (weatherAlerts.firstChild) {
        weatherAlerts.firstChild.remove();
    };
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

    while (hourlyForecast.firstChild) {
        hourlyForecast.firstChild.remove();
    };
    //Hourly forecast
    for (let i = 0; i < 7; i++) {
        const contentsContainer = document.createElement('div');
        //Hour
        const hourDiv = document.createElement('div');
        //Get currentHour, forEach element in hourly array, if currentHour matches element's hour, start array count from that index
        const date = new Date(weatherData.hourly[i].dt * 1000);
        const hour = new Date(date);
        hourDiv.textContent = `${hour.getHours()}:00`;
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

    const date = new Date(weatherData.current.dt * 1000);
    const hour = new Date(date);
    console.log('current hour:');
    console.log(hour.getHours());
};

export { renderData };
