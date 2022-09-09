import "./style.css";

const dayOfTheWeek = (data) => {
  // display full weekday
  let options = { weekday: "long" };
  // returns a new Date object
  const d = new Date(data);
  // return portion of new Date with options in english
  let day = d.toLocaleDateString("en-US", options);
  return day;
};

// remove class forecast
const removeForecast = () => {
  const content = document.querySelector(".content");
  const forecast = document.querySelector(".forecast");

  content.removeChild(forecast);
};

// create new class forecast
const createForecast = () => {
  const content = document.querySelector(".content");
  const forecast = document.createElement("div");
  forecast.classList.add("forecast");
  content.appendChild(forecast);
};

// display 5 days of weather
async function displayForecast(forecastData) {
  // if forecast already exist, delete old ones before making new ones
  const checkClass = document.querySelectorAll(".forecastContainer").length > 0;
  if (checkClass) {
    removeForecast();
    createForecast();
  }
  let count = 6;
  const forecast = document.querySelector(".forecast");
  try {
    // eslint-disable-next-line no-plusplus
    // create five times weather
    for (let i = 0; i < 5; i++) {
      const forecastContainer = document.createElement("div");
      forecastContainer.classList.add("forecastContainer");
      forecastContainer.setAttribute("id", "forecastContainer");
      forecast.appendChild(forecastContainer);
      const forecastDate = document.createElement("div");
      forecastContainer.appendChild(forecastDate);
      const forecastLocation = document.createElement("div");
      forecastLocation.classList.add("forecastTitle");
      forecastLocation.setAttribute("id", "forecastLocation");
      forecastContainer.appendChild(forecastLocation);
      const forecastWeather = document.createElement("img");
      forecastContainer.appendChild(forecastWeather);
      const forecastCelcius = document.createElement("div");
      forecastCelcius.classList.add("forecastCelcius");
      forecastCelcius.setAttribute("id", "forecastCelcius");
      forecastContainer.appendChild(forecastCelcius);

      // full date + time
      const forecastString = forecastData.list[count].dt_txt;
      // split date with time
      const dateSplit = forecastString.split(" ");

      // kelvin to celcius
      const celcius = forecastData.list[count].main.temp - 273.15;
      const forecastIconCode = await forecastData.list[count].weather[0].icon;
      const forecastIcon = await fetch(
        "http://openweathermap.org/img/wn/" + forecastIconCode + "@2x.png",
        { mode: "cors" }
      );

      // eslint-disable-next-line prefer-destructuring
      forecastDate.textContent = dayOfTheWeek(dateSplit[0]);
      forecastLocation.textContent = forecastData.city.name;
      forecastWeather.src = forecastIcon.url;
      // forecastWeather.textContent = forecastData.list[count].weather[0].description;
      forecastCelcius.textContent = `${celcius.toFixed(1)} °C`;

      count += 8;
    }
  } catch (error) {
    console.log(error);
  }
}

// fetch data for forecast from openweathermap
async function weatherForecast(data) {
  if (data === undefined || data === "") {
    // eslint-disable-next-line no-param-reassign
    data = "Amsterdam";
  }
  try {
    // fetch data from a specific location
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=961f16139b0e34a8cdd9444a0479777d`;
    // fetch data
    const reponse = await fetch(api, { mode: "cors" });
    // turn data to json
    const forecastData = await reponse.json();
    // eslint-disable-next-line no-use-before-define
    displayForecast(forecastData);
  } catch (error) {
    console.log(error);
  }
}
weatherForecast();

// create current weather
const mainWeather = (weatherData, icon) => {
  const currentLocation = document.querySelector(".currentLocation");
  const currentWeather = document.querySelector(".currentWeather");
  const currentCelcius = document.querySelector(".currentCelcius");

  // kelvin to celcius
  const celcius = weatherData.main.temp - 273.15;

  currentLocation.textContent = weatherData.name;
  currentWeather.src = icon.url;
  // currentWeather.textContent = weatherData.weather[0].description;
  currentCelcius.textContent = `${celcius.toFixed(1)} °C`;
};

// fetch data for current weather from openweathermap
async function getWeather(data) {
  if (data === undefined || data === "") {
    // eslint-disable-next-line no-param-reassign
    data = "Amsterdam";
  }
  try {
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=961f16139b0e34a8cdd9444a0479777d`;
    // fetch weather api
    const response = await fetch(api, { mode: "cors" });
    // turn response to json
    const weatherData = await response.json();
    // get icon code
    const weatherIcon = await weatherData.weather[0].icon;
    // fetch image
    const icon = await fetch(
      "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png",
      { mode: "cors" }
    );
    // send weatherData and icon to mainWeather function
    mainWeather(weatherData, icon);
  } catch (error) {
    console.log(error);
  }
}
getWeather();

// const form = document.querySelector('.form');
const searchBar = document.querySelector(".searchBar");
const searchButton = document.querySelector(".searchButton");

// on submit change openweathermap 'api' location
searchButton.addEventListener("click", () => {
  // eslint-disable-next-line no-restricted-globals, no-unused-expressions
  event.preventDefault;
  getWeather(searchBar.value);
  weatherForecast(searchBar.value);
  console.log(searchBar.value);
  searchBar.value = "";
});
