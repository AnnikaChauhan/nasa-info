// GET https://api.nasa.gov/planetary/apod
// oXj5PnRzPch835WTgoThSVfQdftEDm8WsqJsM4e4

const key = "oXj5PnRzPch835WTgoThSVfQdftEDm8WsqJsM4e4";

async function getNasaImage() {
    const params = {
        api_key: key
    }
    const response = await axios.get("https://api.nasa.gov/planetary/apod", { params });
        //entire response
    //console.log(response);
        //just data
    //console.log(response.data);
        //put image onto the page
    const img = document.createElement('img')
    img.src = response.data.url
    document.getElementById('nasapic').appendChild(img); 
}

getNasaImage();

roundToTwoDecimalPlaces = (number) => {
    return Number.parseFloat(number).toFixed(2);
}

farenheitToCelsius = (farenheight) => {
    let celcius = (farenheight - 32) * (5/9);
    return celcius;
}

getTheDate = (date) => {
    const dateAsDate = Date(date);
    return dateAsDate;
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
                                            <p>Highs: ${roundToTwoDecimalPlaces(farenheitToCelsius(weatherObject[Object.keys(weatherObject)[6]].AT.mx))}°C</p>
                                            <p>Lows: ${roundToTwoDecimalPlaces(farenheitToCelsius(weatherObject[Object.keys(weatherObject)[6]].AT.mn))}°C</p>

                                        </div>`
    const dailyWeatherSection = document.createElement('section');
    for(let i = 0; i < 7; i++){
        const keyNames = Object.keys(weatherObject)[i];
        const weatherPerDay = weatherObject[Object.keys(weatherObject)[i]];
        dailyWeatherSection.innerHTML +=    `<article class="dailyWeather">
                                    <h3>Sol ${keyNames}</h3>
                                    <h4>${getTheDate(weatherPerDay.First_UTC)}</h4>
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