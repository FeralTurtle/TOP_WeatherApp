const renderData = (locationName, weatherData) => {
    console.log('render data');
    renderContainer1(locationName, weatherData);
    renderContainer2(weatherData);
    renderContainer3(weatherData);
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

    //Weather alerts
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

    //Hourly forecast
    while (hourlyForecast.firstChild) {
        hourlyForecast.firstChild.remove();
    };
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
    console.log('render container 3');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const container3 = document.querySelector('.container-3');

    while (container3.firstChild) {
        container3.firstChild.remove();
    };
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

export { renderData };
