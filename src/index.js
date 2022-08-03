function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thuersday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    return day + " " + hours + ":" + minutes;
  }
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);

  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
  
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  
    let forecastHTML = `<div class="row">`;
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 18° </span>
            <span class="weather-forecast-temperature-min"> 12° </span>
          </div>
        </div>
    `;
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
  }
  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "895f6c518a59a276ebe4654bd029d1cd";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    
    celsiusTemperture = Math.round(
      response.data.main.temp);
    document.querySelector("#current-temp").innerHTML = Math.round(
      celsiusTemperture
    );


    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
     let iconElement = document.querySelector("#icon");
     iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

     getForecast(response.data.coord);

  }
  
  
  function searchCity(city) {
    let apiKey = "895f6c518a59a276ebe4654bd029d1cd";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-index").value;
    searchCity(city);
  }
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperture * 9) /  5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#current-temp");
    temperatureElement.innerHTML = Math.round(celsiusTemperture);
  }

let celsiusTemperture = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", convertToCelsius);

  let searchForm = document.querySelector("#city-search");
  searchForm.addEventListener("submit", handleSubmit);

  displayForecast();