let now = new Date();

let div = document.querySelector("#dateDay");

let date = now.getDate();
let year = now.getFullYear();

let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
let month = months[now.getMonth()];


div.innerHTML = `${date} ${month}, ${year}`;

let span = document.querySelector("#datedayName");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

span.innerHTML = `${day}`;


function formatDay(timestamp) {

    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}


function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="week-container" id="forecast"><ul class="week-list">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 4) {
            forecastHTML =
                forecastHTML +
                `
                <li>
            <img id="clouds" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="Clouds"  width="40"  class="clouds cl-xs">
            <span class="day-name">
            ${formatDay(forecastDay.dt)}
            </span>
            <span class="day-temp" id="wednesday">
            ${Math.round(forecastDay.temp.max)} º
            </span>
            </li>      
            `;
        }
    });
    forecastHTML =
        forecastHTML +
        `</ul>
  </div>`;
    forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {

    console.log(coordinates);
    let apiKey = "037b30185cb9003c439e3114a57b5ab5";
    let apiUrl = ` https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}



function displayWeather(response) {

    let temperatureElement = document.querySelector("#temperature");

    celciusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = `${Math.round(celciusTemperature)}`;

    document.querySelector("#city").innerHTML = response.data.name;

    document.querySelector("#clouds").innerHTML = `${Math.round(
        response.data.main.temp.day)}`;

    document.querySelector("#humidity").innerHTML = `  ${response.data.main.humidity} %`;

    document.querySelector("#wind").innerHTML = ` ${Math.round(response.data.wind.speed)} km/h`;

    document.querySelector("#precipitation").innerHTML = `${Math.round(response.data.main.pressure)} hPa`;

    document.querySelector("#description").innerHTML =
        response.data.weather[0].main;

    getForecast(response.data.coord);

}




function displayFahrenheitTemperature(event) {
    event.preventDefault();

    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}




function displayCelsiusTemperature(event) {
    event.preventDefault();

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);






function searchCity(city) {
    let apiKey = "037b30185cb9003c439e3114a57b5ab5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
}



function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}



function searchLocation(position) {
    let apiKey = "037b30185cb9003c439e3114a57b5ab5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
        }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    let apiUrl4Days = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}${position.coords.latitude
        }&lon=${position.coords.longitude}&appid=${apiKey}`;

    axios.get(apiUrl).then(displayWeather);
}



function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Paris");