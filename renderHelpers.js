const changeBackground = (weatherForecast) => {
    const weatherCondition = weatherForecast.current.weather[0].icon;
    const body = document.querySelector('body');

    if (weatherCondition === '01d') {
        body.className = 'clear-day';
    } else if ((weatherCondition === '02d') || (weatherCondition == '03d') || (weatherCondition == '04d')) {
        body.className = 'cloudy-day';
    } else if ((weatherCondition === '09d') || (weatherCondition == '10d') || (weatherCondition == '11d')) {
        body.className = 'rainy-day';
    } else if (weatherCondition === '13d') {
        body.className = 'snowy-day';
    } else if (weatherCondition === '50d') {
        body.className = 'misty-day';
    };

    if (weatherCondition === '01n') {
        body.className = 'clear-night';
    } else if ((weatherCondition === '02n') || (weatherCondition == '03n') || (weatherCondition == '04n')) {
        body.className = 'cloudy-night';
    } else if ((weatherCondition === '09n') || (weatherCondition == '10n') || (weatherCondition == '11n')) {
        body.className = 'rainy-night';
    } else if (weatherCondition === '13n') {
        body.className = 'snowy-night';
    } else if (weatherCondition === '50n') {
        body.className = 'misty-night';
    };
};

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

export { changeBackground, clearPage, airQualityDescription };
