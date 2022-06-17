var cityFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-search");
var date = dayjs().format("MM/DD/YYYY");
var cityName = "";
var lat = "";
var lon = "";
var buttonIdCounter = 0;


// runs when searhc for city button pressed
var cityFormHandler = function() {
    event.preventDefault();
    cityName = cityInputEl.value.trim();

    // converts city name to usable long/lat values
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=a74391bcfbdf1e9827d65a7e2e76f024"
    fetch(geocodeUrl).then(function(response) {
        response.json().then(function(data) {
            lat = data[0].lat;
            lon= data[0].lon;

            //runs weather api function for one day and five day forecasts
            getTodaysWeather();
            getFiveDayWeather();    
            
            // runs function that store long/lat in local storage and creates corresponding button
            // saveCity(data, cityName);

    
        });
    });

    //clear input area for city search
    cityInputEl.value = "";
};



var getTodaysWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=a74391bcfbdf1e9827d65a7e2e76f024";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        var weather = data;
        // console.log(weather);


        //storing weather data from api
        var todaysWeather = weather.current.weather[0].icon;
        var todaysTemp = weather.current.temp;
        var todaysWind = weather.current.wind_speed;
        var todaysHumidity = weather.current.humidity;
        var todaysUvi = weather.current.uvi;
        
            // console.log(todaysWeather);
        //sending stored data to function that will print to screen
        printToday(todaysTemp, todaysWind, todaysHumidity, todaysUvi, todaysWeather );


        });
    });
};

var getFiveDayWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=a74391bcfbdf1e9827d65a7e2e76f024";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        var weather = data;
        var fiveDayArr = [];


        //storing weather data from api
        for (var i = 0; i < 5; i++) {
            date = dayjs().add(i + 1, 'day').format("MM/DD/YYYY");
            var fiveDayObj = {
                date: date,
                weather: weather.daily[i].weather[0].icon,
                temp: weather.daily[i].temp.day,
                wind: weather.daily[i].wind_speed,
                humidity: weather.daily[i].humidity
            };

            fiveDayArr.push(fiveDayObj);
        };
        // console.log(fiveDayArr);
        // document.getElementById("#five-days").innerHTML = "";

        //sending stored data to function that will print to screen
        printFiveDay(fiveDayArr);
        });
    });
};

var printToday = function(temp, wind, humidity, uvi, weather) {
    //accessing points on screen where data will be printed
    var weatherTodayTitleEl = document.querySelector("#city-date");
    var todaysTempEl = document.querySelector("#temp");
    var todaysWindEl = document.querySelector("#wind");
    var todaysHumidityEl = document.querySelector("#humidity");
    var todaysUvEl = document.querySelector("#uv-index");
    var iconContainerEl = document.querySelector("#cloud-icon");

    //printing data to screen
    weatherTodayTitleEl.textContent = cityName + " (" + date + ")";
    todaysTempEl.textContent = "Temp: " + temp + "F";
    todaysWindEl.textContent = "Wind Speed: " + wind + "mph";
    todaysHumidityEl.textContent = "Humidity: " + humidity + "%";
    todaysUvEl.textContent = "UVI: " + uvi;

    //changing uvi icon color depending on index favorability
    if (uvi > 0 & uvi < 3) {
        todaysUvEl.classList.add("green");
    } else if ( uvi > 3 & uvi < 8) {
        todaysUvEl.classList.add("yellow")
    } else {
        todaysUvEl.classList.add("red")
    };


    //adding corresponding weather icon
    var icon = weather;
    console.log(icon);
    if (icon === "01d"|| icon === "01n") {
            iconContainerEl.setAttribute("src", "./assets/images/01d.png")
        } else if (icon === "02d" || icon === "02n") {
            iconContainerEl.setAttribute("src", "./assets/images/02d.png");
        } else if (icon === "03d"|| icon === "03n") {
            iconContainerEl.setAttribute("src", "./assets/images/03d.png");
        } else if (icon === "04d"|| icon === "04n") {
            iconContainerEl.setAttribute("src", "./assets/images/04d.png");
        } else if (icon === "09d"|| icon === "09n") {
            iconContainerEl.setAttribute("src", "./assets/images/09d.png");
        } else if (icon === "10d"|| icon === "10n") {
            iconContainerEl.setAttribute("src", "./assets/images/10d.png");
        } else if (icon === "11d"|| icon === "11n") {
            iconContainerEl.setAttribute("src", "./assets/images/11d.png");
        } else if (icon === "13d"|| icon === "13n") {
            iconContainerEl.setAttribute("src", "./assets/images/13d.png");
        } else if (icon === "50d"|| icon === "50n") {
            iconContainerEl.setAttribute("src", "./assets/images/50d.png");
        } else {
            iconContainerEl.setAttribute("src", "");
        };
 };

var printFiveDay = function(fiveDayArr) {
    var fiveDayTitleEl = document.querySelector("#five-forecast");
    fiveDayTitleEl.textContent = "Five Day Forecast: "

    var fiveDayContainerEl = document.querySelector("#five-days");
    fiveDayContainerEl.innerHTML = "";
    
    //moving through array of stored weather data and creating forecast day boxes
    for (var i = 0; i < fiveDayArr.length; i ++) {
       
        var oneDayContainerEl = document.createElement("div");
        oneDayContainerEl.classList.add("one-day-container");
        fiveDayContainerEl.appendChild(oneDayContainerEl);

        var oneDayDateEl = document.createElement("h2");
        oneDayDateEl.textContent =  fiveDayArr[i].date;
        oneDayDateEl.classList.add("city-date");
        oneDayContainerEl.appendChild(oneDayDateEl);

        var oneDayIconEl = document.createElement("img");
        oneDayIconEl.classList.add("icon");
        oneDayContainerEl.appendChild(oneDayIconEl);

        //adding corresponding weather icon
        var icon = fiveDayArr[i].weather;
        console.log(icon)
        if (icon === "01d"|| icon === "01n") {
                oneDayIconEl.setAttribute("src", "./assets/images/01d.png")
            } else if (icon === "02d"|| icon === "02n") {
                oneDayIconEl.setAttribute("src", "./assets/images/02d.png");
            } else if (icon === "03d"|| icon === "03n") {
                oneDayIconEl.setAttribute("src", "./assets/images/03d.png");
            } else if (icon = "04d" || icon === "04n") {
                oneDayIconEl.setAttribute("src", "./assets/images/04d.png");
            } else if (icon = "09d" || icon === "05n") {
                oneDayIconEl.setAttribute("src", "./assets/images/09d.png");
            } else if (icon = "10d" || icon === "10n") {
                oneDayIconEl.setAttribute("src", "./assets/images/10d.png");
            } else if (icon = "11d" || icon === "11n") {
                oneDayIconEl.setAttribute("src", "./assets/images/11d.png");
            } else if (icon = "13d" || icon === "13n") {
                oneDayIconEl.setAttribute("src", "./assets/images/13d.png");
            } else if (icon = "50d" || icon === "50n") {
                oneDayIconEl.setAttribute("src", "./assets/images/50d.png");
            } else {
                oneDayIconEl.setAttribute("src", "");
            };
      

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



// var saveCity = function(data, cityName) {
//   var savedLat =  data[0].lat;
//   var savedLon = data[0].lon;
//   var savedCity = cityName;

//   var savedCitiesArr = [];

//   var savedCityObj = {
//     city: savedCity,
//     lat: savedLat,
//     lon: savedLon
//     };

//     savedCitiesArr.push(savedCityObj);

//     localStorage.setItem("savedCities", JSON.stringify(savedCitiesArr));
  
//     loadCities();
// };

// var loadCities = function() {

//     localStorage.getItem("savedCities");



    
//   var savedCitiesContainerEl = document.querySelector("#saved-cities");

//   var savedCityBtnEl = document.createElement("button");
//     savedCityBtnEl.textContent = savedCity;
//     savedCityBtnEl.classList.add("saved-city");
//     savedCityBtnEl.setAttribute("data-button-id", buttonIdCounter)
//     savedCitiesContainerEl.appendChild(savedCityBtnEl);

//     buttonIdCounter++;

//     localStorage.setItem("savedCities", JSON.stringify(savedCitiesArr));
//     console.log(localStorage);
  
//     localStorage.getItem("savedCities");
// };

cityFormEl.addEventListener("submit", cityFormHandler);

