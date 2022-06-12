var cityFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-search");
var date = dayjs().format("MM/DD/YYYY");
var city = "";
var lat = "";
var long = "";
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=current,minutely,hourly,alerts&appid=a74391bcfbdf1e9827d65a7e2e76f024";
var todaysTemp = "";
var todaysWind = "";
var todaysHumidity = "";
var todaysUv = "";

var cityFormHandler = function() {
    event.preventDefault();
    city = cityInputEl.value.trim();
    console.log(city);
    console.log(date);
};



var getWeather = function() {
fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
        console.log(data);
    });
});
};

cityFormEl.addEventListener("submit", cityFormHandler);