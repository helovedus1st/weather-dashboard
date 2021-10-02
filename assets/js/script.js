var searchHistory = [];
var apiKey = 'a4220fb97dc10c679584bc6c652f5441';
var rootUrl = 'https://api.openweathermap.org';

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var currentWeather = document.querySelector('#today');
var forecastWeather = document.querySelector('#forecast');
var historyContainer = document.querySelector('#history');

function getLatLong(event) {
    event.preventDefault();
    console.log(event);
    var city = searchInput.value.trim();

    var coordinatesUrl = rootUrl + '/geo/1.0/direct?q=' + city + "&limit=5&appid=" + apiKey;
    console.log(city);

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
}

searchForm.addEventListener('submit', getLatLong);