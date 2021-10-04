var searchHistory = [];
var apiKey = 'a4220fb97dc10c679584bc6c652f5441';
var rootUrl = 'https://api.openweathermap.org';

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var currentWeather = document.querySelector('#today');
var forecastWeather = document.querySelector('#forecast');
var historyContainer = document.querySelector('#history');

var cityFound = document.querySelector('#city-found');
var tempFound = document.querySelector('#temp');
var windFound = document.querySelector('#wind');
var humidityFound = document.querySelector('#humidity');
var uviFound = document.querySelector('#uvi')
var dateFound = document.querySelector('#todays-date')

function getLatLong(event) {
    event.preventDefault();
    console.log(event);
    var city = searchInput.value.trim();

    var coordinatesUrl = rootUrl + '/geo/1.0/direct?q=' + city + "&limit=5&appid=" + apiKey;

    fetch(coordinatesUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data[0].lat, data[0].lon);
            getWeather(data[0].lat, data[0].lon);
        });
}

function getWeather(lat, lon) {
    console.log('inside getWeather() function');
    console.log (lat, lon);

    var cityUrl = rootUrl + '/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial' + '&appid=' + apiKey
    console.log (cityUrl)

    fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        showCurrent(data.current.temp, data.current.wind_speed, data.current.humidity, data.current.dt, data.current.uvi)
    });
}

function showCurrent(temp, wind, humidity, weatherDate, uvi) {
        var city = searchInput.value.trim();
        var convertedDate = new Date(weatherDate*1000).toLocaleDateString("en-US");
        dateFound.textContent = convertedDate;
        cityFound.textContent = city;
        tempFound.textContent = temp + '°F';
        windFound.textContent = wind + ' mph';
        humidityFound.textContent = humidity + '%';
        uviFound.textContent = uvi;
    
}

searchForm.addEventListener('submit', getLatLong);