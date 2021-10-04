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
var forecastFound = document.querySelector('#forecast')
var iconFound = document.querySelector('#icon');

var futureIcon1Found = document.querySelector('#futureIcon1');
var futureDate1Found = document.querySelector('#futureDate1');
var futureForecast1Found = document.querySelector('#futureForecast1');
var futureTemp1Found = document.querySelector('#futureTemp1');
var futureWind1Found = document.querySelector('#futureWind1');
var futureHumidity1Found = document.querySelector('#futureHumidity1');




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
            getFutureWeather1(data[0].lat, data[0].lon);
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
        showCurrent(data.current.temp, data.current.wind_speed, data.current.humidity, data.current.dt, data.current.uvi, data.current.weather[0].main, data.current.weather[0].icon);
    });
}

function getFutureWeather1(lat, lon) {
    console.log('inside getFutureWeather() function');
    console.log (lat, lon);

    var cityUrl = rootUrl + '/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial' + '&appid=' + apiKey
    console.log (cityUrl)

    fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        showFuture1(data.daily[1].temp.day, data.daily[1].wind_speed, data.daily[1].humidity, data.daily[1].dt, data.daily[1].weather[0].main, data.daily[1].weather[0].icon);
    });
}

function showCurrent(temp, wind, humidity, weatherDate, uvi, forecast, icon) {
        var city = searchInput.value.trim();
        var convertedDate = new Date(weatherDate*1000).toLocaleDateString("en-US");
        dateFound.textContent = convertedDate;
        cityFound.textContent = city;
        tempFound.textContent = temp + '°F';
        windFound.textContent = wind + ' mph';
        humidityFound.textContent = humidity + '%';
        uviFound.textContent = uvi;
        forecastFound.textContent = forecast;
        document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + icon +"@4x.png";
    
}

function showFuture1(futureTemp1, futureWind1, futureHumidity1, futureDate1, futureForecast1, futureIcon1) {
        var convertedDate = new Date(futureDate1*1000).toLocaleDateString("en-US");
        futureDate1Found.textContent = convertedDate;
        futureTemp1Found.textContent = futureTemp1 + '°F';
        futureWind1Found.textContent = futureWind1 + ' mph';
        futureHumidity1Found.textContent = futureHumidity1 + '%';
        futureForecast1Found.textContent = futureForecast1;
        document.getElementById("futureIcon1").src = "http://openweathermap.org/img/wn/" + futureIcon1 +"@4x.png";
    
}

searchForm.addEventListener('submit', getLatLong);