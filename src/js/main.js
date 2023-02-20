import { loadHeaderFooter, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Country from "./Country.mjs";

loadHeaderFooter();

const externalServices = new ExternalServices();
const country = new Country();

externalServices.init();
country.showCountryDropDown();

const foreCastData = externalServices.hourlyForecastData().then(
    result => createWeatherHTML(result)
);

function renderForecastData(foreCastData) {

    ;

    
}

async function createWeatherHTML(weatherData) {

    const weatherDiv = document.getElementById('weather');

    while (weatherDiv.firstChild) {
        weatherDiv.removeChild(weatherDiv.firstChild);
    }


    // ;
  
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
      temperature.textContent = `Temperature: ${weatherData.list[i].main.temp}`;
      weatherBox.appendChild(temperature);
  
      const description = document.createElement('p');
      description.textContent = `Description: ${weatherData.list[i].weather[0].description}`;
      weatherBox.appendChild(description);
  
      weatherContainer.appendChild(weatherBox);
    }
  
    
    weatherDiv.appendChild(weatherContainer);
  }

document.querySelector("#locationBtn").addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.forms["location"];

    const json = formDataToJSON(form);

    externalServices.hourlyForecastData(json.latitude, json.longitude).then(
        function(result) {createWeatherHTML(result)}
    );
});

document.querySelector("#countries").addEventListener('change', (e) => {

    externalServices.findCountryInfo(e.target.value, 1).then(
        result => {
            externalServices.hourlyForecastData(result[0].lat, result[0].lon).then(
                function(result) {createWeatherHTML(result)}
            );
        }
    );
    
});