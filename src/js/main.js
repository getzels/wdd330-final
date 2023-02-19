import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const externalServices = new ExternalServices();
externalServices.init();

const foreCastData = await externalServices.hourlyForecastData();

function renderForecastData(foreCastData) {

    createWeatherHTML(foreCastData);

    
}

async function createWeatherHTML(weatherData) {

    let coutryInfo = await externalServices.findCountryInfo(weatherData.city.name, 5);
  
    const weatherContainer = document.createElement('div');
    weatherContainer.classList.add('weather-container');
  
    const weatherTitle = document.createElement('h1');
    weatherTitle.textContent = 'Weather in ' + weatherData.city.name;
  
    weatherContainer.appendChild(weatherTitle);
  
    for (let i = 0; i < 4; i++){
      const weatherBox = document.createElement('div');
      weatherBox.classList.add('weather-box');
  
      const dateTime = document.createElement('p');
      dateTime.textContent = `Date/Time: ${weatherData.dt_txt}`;
      weatherBox.appendChild(dateTime);
  
      const img = document.createElement('img');
      img.src = "http://openweathermap.org/img/w/" + weatherData.list[i].weather[0].icon  + ".png";
      img.alt = weatherData.list[i].weather[0].description;
      weatherBox.appendChild(img);
  
      const temperature = document.createElement('p');
      temperature.textContent = `Temperature: ${weatherData.list[i].temp}`;
      weatherBox.appendChild(temperature);
  
      const description = document.createElement('p');
      description.textContent = `Description: ${weatherData.list[i].weather[0].description}`;
      weatherBox.appendChild(description);
  
      weatherContainer.appendChild(weatherBox);
    }
  
    const weatherDiv = document.getElementById('weather');
    weatherDiv.appendChild(weatherContainer);
  }

renderForecastData(foreCastData);