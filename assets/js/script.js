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
var revealAllFound = document.querySelector("#all-found");






function getLatLong(event) {
    event.preventDefault();
    console.log(event);
    var city = searchInput.value.trim();

    var coordinatesUrl = rootUrl + '/geo/1.0/direct?q=' + city + "&limit=5&appid=" + apiKey;

    fetch(coordinatesUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data[0].lat, data[0].lon);
            getWeather(data[0].lat, data[0].lon);
            getFutureWeather1(data[0].lat, data[0].lon);
            makeHistoryButton(data[0].lat, data[0].lon);
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
        for (var i = 1; i < 6; i++) {
            showFuture(data.daily[i].temp.day, data.daily[i].wind_speed, data.daily[i].humidity, data.daily[i].dt, data.daily[i].weather[0].main, data.daily[i].weather[0].icon, i);
        }
        
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
        if (uvi > 5 && uvi < 8) {
            uviFound.classList.add("alert-warning")
         } else if (uvi >= 8) {
            uviFound.classList.add("alert-danger")
         }
        forecastFound.textContent = forecast;
        document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + icon +"@4x.png";
    
}

function showFuture(futureTemp, futureWind, futureHumidity, futureDate, futureForecast, futureIcon, i) {
    var futureIconFound = document.querySelector('#futureIcon' + i);
    var futureDateFound = document.querySelector('#futureDate' + i);
    var futureForecastFound = document.querySelector('#futureForecast' + i);
    var futureTempFound = document.querySelector('#futureTemp' + i);
    var futureWindFound = document.querySelector('#futureWind' + i);
    var futureHumidityFound = document.querySelector('#futureHumidity' + i);

    // source date data must be converted from unix timestamp to US format
    var convertedDate = new Date(futureDate*1000).toLocaleDateString("en-US");
    futureDateFound.textContent = convertedDate;

    futureTempFound.textContent = futureTemp + '°F';
    futureWindFound.textContent = futureWind + ' mph';
    futureHumidityFound.textContent = futureHumidity + '%';
    futureForecastFound.textContent = futureForecast;
    futureIconFound.src = "http://openweathermap.org/img/wn/" + futureIcon +"@4x.png";
    
    // reveal hidden content elements after acquiring data
    revealAllFound.classList.remove("d-none");
    
}

searchForm.addEventListener('submit', getLatLong);