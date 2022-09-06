import './style.css';

async function getWeather() {
  try {
    // fetch weather api
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Amsterdam&APPID=961f16139b0e34a8cdd9444a0479777d', { mode: 'cors' });
    // turn response to json
    const weatherData = await response.json();
    // send weatherData to mainWeather function
    // eslint-disable-next-line no-use-before-define
    mainWeather(weatherData);
  } catch (error) {
    console.log(error);
  }
}
getWeather();

async function weatherForecast() {
  try {
    const reponse = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=Amsterdam&appid=961f16139b0e34a8cdd9444a0479777d', { mode: 'cors' });
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

const displayForecast = (forecastData) => {
  let count = 6;
  const forecast = document.querySelector('.forecast');
  console.log(forecastData); // 6, 14, 22, 30, 38
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
