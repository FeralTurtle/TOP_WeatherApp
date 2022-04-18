const renderData = (weatherData) => {
    console.log('render data');
    renderContainer1(weatherData);
    renderContainer2(weatherData);
};

const renderContainer1 = (weatherData) => {
    console.log('render container 1');
    const iconCode = weatherData.current.weather[0].icon;
    const cityName = document.querySelector('.container-1 > p:nth-child(1)');
    const img = document.querySelector('.container-1 > img:nth-child(2)');
    const infoParagraph1 = document.querySelector('.container-1 > .info > p:nth-child(1)');
    const infoParagraph2 = document.querySelector('.container-1 > .info > p:nth-child(2)');
    const infoParagraph3 = document.querySelector('.container-1 > .info > p:nth-child(3)');

    cityName.textContent = weatherData.name;
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
        console.log('hi');
        descriptionPopup.style.display = 'none';
    });
};

export { renderData };
