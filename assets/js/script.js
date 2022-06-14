var cityFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-search");
var date = dayjs().format("MM/DD/YYYY");
var cityName = "";
var lat = "";
var lon = "";
var fiveDayArr = [];
var saveBtn =

var cityFormHandler = function() {
    event.preventDefault();
    cityName = cityInputEl.value.trim();
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=a74391bcfbdf1e9827d65a7e2e76f024"
    fetch(geocodeUrl).then(function(response) {
        response.json().then(function(data) {
            lat = data[0].lat;
            lon= data[0].lon;
            getTodaysWeather();
            getFiveDayWeather();
        });
    });

    var savedCitiesContainerEl = document.querySelector("#saved-cities");
    var saveBtn = document.createElement("button");
    saveBtn.textContent= "Save this city?";
    saveBtn.setAttribute("id", "save-btn");
    saveBtn.classList.add("button");
    savedCitiesContainerEl.appendChild(saveBtn);


    cityInputEl.value = "";
};



var getTodaysWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=a74391bcfbdf1e9827d65a7e2e76f024";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        var weather = data;
        console.log(weather);

        var todaysClouds = weather.current.clouds;
        var todaysTemp = weather.current.temp;
        var todaysWind = weather.current.wind_speed;
        var todaysHumidity = weather.current.humidity;
        var todaysUvi = weather.current.uvi;

        printToday(todaysTemp, todaysWind, todaysHumidity, todaysUvi, todaysClouds);


        });
    });
};

var getFiveDayWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=a74391bcfbdf1e9827d65a7e2e76f024";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        var weather = data;

        for (var i = 0; i < 5; i++) {
            date = date ++;
            var fiveDayObj = {
                date: date,
                temp: weather.daily[i].temp.day,
                wind: weather.daily[i].wind_speed,
                humidity: weather.daily[i].humidity
            };

            fiveDayArr.push(fiveDayObj);
        };
        console.log(fiveDayArr);
        printFiveDay(fiveDayArr);
        });
    });
};

var printToday = function(temp, wind, humidity, uvi, clouds) {
    var weatherTodayTitleEl = document.querySelector("#city-date");
    var todaysTempEl = document.querySelector("#temp");
    var todaysWindEl = document.querySelector("#wind");
    var todaysHumidityEl = document.querySelector("#humidity");
    var todaysUvEl = document.querySelector("#uv-index");

    weatherTodayTitleEl.textContent = cityName + " (" + date + ")";
    todaysTempEl.textContent = "Temp: " + temp + "F";
    todaysWindEl.textContent = "Wind Speed: " + wind + "mph";
    todaysHumidityEl.textContent = "Humidity: " + humidity + "%";
    todaysUvEl.textContent = "UVI: " + uvi;



//     console.log("The current temp is: " + temp + "F");
//     console.log("The current wind speed is: " + wind + "mph");
//     console.log("The current humidity is: " + humidity + "%");
//     console.log("The current UVI is: " + uvi + "uvi");
 };

var printFiveDay = function(fiveDayArr) {
    var fiveDayTitleEl = document.querySelector("#five-forecast");
    fiveDayTitleEl.textContent = "Five Day Forecast: "

    for (var i = 0; i < fiveDayArr.length; i ++) {
        var fiveDayContainerEl = document.querySelector("#five-days");
        var oneDayContainerEl = document.createElement("div");
        oneDayContainerEl.classList.add("one-day-container");
        fiveDayContainerEl.appendChild(oneDayContainerEl);

        var oneDayDateEl = document.createElement("h2");
        oneDayDateEl.textContent =  fiveDayArr[i].date;
        oneDayDateEl.classList.add("city-date");
        oneDayContainerEl.appendChild(oneDayDateEl);

        var oneDayTempEl = document.createElement("p");
        oneDayTempEl.textContent = "Temp: " + fiveDayArr[i].temp + "F";
        oneDayContainerEl.appendChild(oneDayTempEl);

        var oneDayWindEl = document.createElement("p");
        oneDayWindEl.textContent = "Wind: " + fiveDayArr[i].wind + "mph";
        oneDayContainerEl.appendChild(oneDayWindEl);

        var oneDayHumidityEl = document.createElement("p");
        oneDayHumidityEl.textContent = "Humidity: " + fiveDayArr[i].humidity + "%";
        oneDayContainerEl.appendChild(oneDayHumidityEl);
    };
};

var saveCity = function() {
  console.log("button worked");
};

cityFormEl.addEventListener("submit", cityFormHandler);

