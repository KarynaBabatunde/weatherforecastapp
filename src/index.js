function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
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
  
  function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#current-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
     let iconElement = document.querySelector("#icon");
     iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

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
  let searchForm = document.querySelector("#city-search");
  searchForm.addEventListener("submit", handleSubmit);
  