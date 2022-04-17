const renderData = (weatherData) => {
    console.log('render data');
    renderContainer1(weatherData);
};

const renderContainer1 = (weatherData) => {
    console.log('render container 1');
    const iconCode = weatherData.weather[0].icon;
    const cityName = document.querySelector('.container-1 > p:nth-child(1)');
    const img = document.querySelector('.container-1 > img:nth-child(2)');
    const infoParagraph1 = document.querySelector('.container-1 > .info > p:nth-child(1)');
    const infoParagraph2 = document.querySelector('.container-1 > .info > p:nth-child(2)');
    const infoParagraph3 = document.querySelector('.container-1 > .info > p:nth-child(3)');

    cityName.textContent = weatherData.name;
    img.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    infoParagraph1.textContent = weatherData.main.temp;
    infoParagraph2.textContent = weatherData.weather[0].description;
    infoParagraph3.textContent = `Min: ${weatherData.main.temp_min}. Max: ${weatherData.main.temp_max}`;
};

export { renderData };