var cityFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-search");
var date = dayjs().format("MM/DD/YYYY");
var cityName = "";
var lat = "";
var lon = "";
// var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=a74391bcfbdf1e9827d65a7e2e76f024";
var todaysTemp = "";
var todaysWind = "";
var todaysHumidity = "";
var todaysUvi = "";

var cityFormHandler = function() {
    event.preventDefault();
    cityName = cityInputEl.value.trim();
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=a74391bcfbdf1e9827d65a7e2e76f024"
    fetch(geocodeUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            lat = data[0].lat;
            lon= data[0].lon;
            getWeather();
        });
    });
};



var getWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=a74391bcfbdf1e9827d65a7e2e76f024";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        var weather = data;

        todaysTemp = weather.current.temp;
        todaysWind = weather.current.wind_speed;
        todaysHumidity = weather.current.humidity;
        todaysUvi = weather.current.uvi;

        printToday(todaysTemp, todaysWind, todaysHumidity, todaysUvi);

        });
    });
};

var printToday = function(temp, wind, humidity, uvi) {
    console.log("The current temp is: " + temp + "F");
    console.log("The current wind speed is: " + wind + "mph");
    console.log("The current humidity is: " + humidity + "%");
    console.log("The current UVI is: " + uvi + "uvi");
};

cityFormEl.addEventListener("submit", cityFormHandler);