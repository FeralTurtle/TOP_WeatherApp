async function getWeather() {
    const locationInput = document.querySelector('#location-input');
    const enteredLocation = locationInput.value;
    const alphabetical = /[A-Za-z]/;
    const fiveNums = /\d{5}/;

    try {
        let responseObj;
        if (alphabetical.test(enteredLocation)) {
            console.log('is a string')
            responseObj = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&appid=145f93b6e84a1bae5151459d8af682a9`, { mode: 'cors' });
        } else if (fiveNums.test(enteredLocation)) {
            console.log('is a number')
            responseObj = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${enteredLocation}&appid=145f93b6e84a1bae5151459d8af682a9`, { mode: 'cors' });
        };
        console.log(responseObj);
        const jsObj = await responseObj.json();
        console.log(jsObj);
        console.log(`${jsObj.name}'s temperature is ${jsObj.main.temp}.`);
    } catch (error) {
        console.log('Error: Could not retrieve data');
    };
};

const locationBtn = document.querySelector('#location-btn');
locationBtn.addEventListener('click', getWeather);

// const moreThanFiveNums = /\d{6,}/;
// const locationInput = document.querySelector('#location-input');
// locationInput.addEventListener('input', () => {
//     if (moreThanFiveNums) {
//         console.log('more than five nums');
//     };
// });
