import './style.css';

const removeForecast = () => {
  const content = document.querySelector('.content');
  const forecast = document.querySelector('.forecast');

  content.removeChild(forecast);
};

const createForecast = () => {
  const content = document.querySelector('.content');
  const forecast = document.createElement('div');
  forecast.classList.add('forecast');
  content.appendChild(forecast);
};

const displayForecast = (forecastData) => {
  const checkClass = document.querySelectorAll('.forecastContainer').length > 0;
  if (checkClass) {
    removeForecast();
    createForecast();
  }
  let count = 6;
  const forecast = document.querySelector('.forecast');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    const forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecastContainer');
    forecast.appendChild(forecastContainer);
    const forecastDate = document.createElement('div');
    forecastContainer.appendChild(forecastDate);
    const forecastLocation = document.createElement('div');
    forecastContainer.appendChild(forecastLocation);
    const forecastWeather = document.createElement('div');
    forecastContainer.appendChild(forecastWeather);
    const forecastCelcius = document.createElement('div');
    forecastContainer.appendChild(forecastCelcius);

    const forecastString = forecastData.list[count].dt_txt;
    const dateSplit = forecastString.split(' ');

    const celcius = forecastData.list[count].main.temp - 273.15;

    // eslint-disable-next-line prefer-destructuring
    forecastDate.textContent = dateSplit[0];
    forecastLocation.textContent = forecastData.city.name;
    forecastWeather.textContent = forecastData.list[count].weather[0].description;
    forecastCelcius.textContent = `${celcius.toFixed(1)} °C`;

    count += 8;
  }
};

async function weatherForecast(data) {
  if (data === undefined) {
    // eslint-disable-next-line no-param-reassign
    data = 'Amsterdam';
  }
  try {
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=961f16139b0e34a8cdd9444a0479777d`;
    const reponse = await fetch(api, { mode: 'cors' });
    const forecastData = await reponse.json();
    // eslint-disable-next-line no-use-before-define
    displayForecast(forecastData);
  } catch (error) {
    console.log(error);
  }
}
weatherForecast();

const mainWeather = (weatherData) => {
  const currentLocation = document.querySelector('.currentLocation');
  const currentWeather = document.querySelector('.currentWeather');
  const currentCelcius = document.querySelector('.currentCelcius');

  const celcius = weatherData.main.temp - 273.15;

  currentLocation.textContent = weatherData.name;
  currentWeather.textContent = weatherData.weather[0].description;
  currentCelcius.textContent = `${celcius.toFixed(1)} °C`;
};

async function getWeather(data) {
  if (data === undefined) {
    // eslint-disable-next-line no-param-reassign
    data = 'Amsterdam';
  }
  try {
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=961f16139b0e34a8cdd9444a0479777d`;
    // fetch weather api
    const response = await fetch(api, { mode: 'cors' });
    // turn response to json
    const weatherData = await response.json();
    // send weatherData to mainWeather function
    mainWeather(weatherData);
  } catch (error) {
    console.log(error);
  }
}
getWeather();

// const form = document.querySelector('.form');
const searchBar = document.querySelector('.searchBar');
const searchButton = document.querySelector('.searchButton');

searchButton.addEventListener('click', () => {
  // eslint-disable-next-line no-restricted-globals, no-unused-expressions
  event.preventDefault;
  getWeather(searchBar.value);
  weatherForecast(searchBar.value);
  searchBar.value = '';
});
