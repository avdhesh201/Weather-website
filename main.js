//CREATED BY AVDHESH KUMAR SINGH :)



const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}
const weatherImageSourceMap ={
  Clouds:"https://cdn1.iconfinder.com/data/icons/weather-99/100/weather-05-256.png",
  Rain:"https://cdn2.iconfinder.com/data/icons/weather-242/44/rain-256.png",
  Mist:"https://cdn2.iconfinder.com/data/icons/weather-242/44/mist-256.png",
  Fog:"https://cdn4.iconfinder.com/data/icons/remixicon-weather/24/foggy-line-128.png",
  Clear:"https://cdn3.iconfinder.com/data/icons/weather-333/17/sun-256.png",
  Smoke:"https://cdn1.iconfinder.com/data/icons/weather-outline-40/24/Weather_Smog_air_smoke_fog_pollution_toxic_gas_steam-128.png"
}
getWeatherResults('delhi');
let searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getWeatherResults(searchbox.value);
  }
}

function getWeatherResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      return response.json();
    }).then(displayResults);
}

function displayResults (weather) {
  const typeOfWeatherIcon = weatherImageSourceMap[weather.weather[0].main]? weatherImageSourceMap[weather.weather[0].main]:weatherImageSourceMap['Fog'];
  let cityHtmlElement = document.querySelector('.location .city');
  cityHtmlElement.innerHTML = `<span><img src=${typeOfWeatherIcon} alt="IMAGE" class="image1">${weather.name}, ${weather.sys.country}</span>`;

  let now = new Date();
  let dateDiv = document.querySelector('.location .date');
  dateDiv.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

function dateBuilder (d) {
  console.log("date by system:",d);
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

