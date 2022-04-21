import { getWeatherData } from './weatherData.js';
import { renderData } from './render.js';

// Restrict user input when attempting to enter a ZIP code over 5 digits
const fiveNums = /\d{5}/;
const locationInput = document.querySelector('#location-input');
locationInput.addEventListener('input', () => {
    if ((locationInput.textLength === 5) && fiveNums.test(locationInput.value)) {
        locationInput.setAttribute('maxlength', '5');
    } else {
        locationInput.removeAttribute('maxlength');
    };
});

//Allow input submit on enter key press
locationInput.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) {
        event.preventDefault();
        locationBtn.click();
    };
});

const locationBtn = document.querySelector('#location-btn');
locationBtn.addEventListener('click', () => {
    if (!locationInput.value == '') {
        const loadPage = async () => {
            const weatherData = await getWeatherData();
            renderData(...weatherData);
        };
        loadPage();
    };
});
