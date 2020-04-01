// GET https://api.nasa.gov/planetary/apod

//import APIkey from "./variables.js";
const key = "lOlH3lnFB8w96r2UdDzVubhemZJxFjDjFQlrr1Ou";

async function getNasaImage() {
    const params = {
        api_key: key
    }
    const response = await axios.get("https://api.nasa.gov/planetary/apod", { params });
    const img = document.createElement('img')
    img.src = response.data.hdurl
    img.alt = 'I wanted to get the best quality image for you so sometimes it takes some time, sorry!'
    document.getElementById('nasapic').appendChild(img); 
}

getNasaImage();

const roundToTwoDecimalPlaces = (number) => {
    return Number.parseFloat(number).toFixed(2);
}

const farenheitToCelsius = (farenheight) => {
    let celcius = (farenheight - 32) * (5/9);
    return celcius;
}

const getTheDate = (date) => {
    const monthsArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const month = Number(date.substr(5,2));
    const monthAsNamed = monthsArray[month - 1];
    const day = Number(date.substr(8, 2));
    return `${day} ${monthAsNamed}`;
}

async function getWeatherOnMars(){
    const params = {
        api_key: key,
        feedtype: "json",
        ver: "1.0"
    }
    const response = await axios.get(`https://api.nasa.gov/insight_weather/`, { params });
    const weatherObject = response.data;
    const todaysWeatherSection = document.createElement('section');
    todaysWeatherSection.innerHTML = `<div class="todayOnMars">
                                            <h3>Today on Mars</h3>
                                            <h4>It is Sol ${Object.keys(weatherObject)[6]}</h4>
                                            <div class="highsAndLows">
                                                <p>Highs: ${roundToTwoDecimalPlaces(farenheitToCelsius(weatherObject[Object.keys(weatherObject)[6]].AT.mx))}°C</p>
                                                <p>Lows: ${roundToTwoDecimalPlaces(farenheitToCelsius(weatherObject[Object.keys(weatherObject)[6]].AT.mn))}°C</p>
                                                </div>

                                        </div>`
    const dailyWeatherSection = document.createElement('section');
    for(let i = 0; i < 7; i++){
        const keyNames = Object.keys(weatherObject)[i];
        const weatherPerDay = weatherObject[Object.keys(weatherObject)[i]];
        dailyWeatherSection.innerHTML +=    `<article class="dailyWeather">
                                    <h3>Sol ${keyNames}</h3>
                                    <p>${getTheDate(weatherPerDay.First_UTC)}</p>
                                    <div class="highsAndLows">
                                        <p>High: ${roundToTwoDecimalPlaces(farenheitToCelsius(weatherPerDay.AT.mx))}°C</p>
                                        <p>Low: ${roundToTwoDecimalPlaces(farenheitToCelsius(weatherPerDay.AT.mn))}°C</p>
                                    </div>
                                </article>`
    }
    document.getElementById('nasaweather').appendChild(todaysWeatherSection);
    document.getElementById('nasaweather').appendChild(dailyWeatherSection);
}

getWeatherOnMars();