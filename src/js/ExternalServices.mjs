import { setLocalStorage, getLocalStorage } from "./utils.mjs";

const countriesEndPoint = "https://restcountries.com/v3.1/all";
const openWeatherBaseURL = "https://api.openweathermap.org/data/2.5/";

const APIKey = "f9bb398c42a5e0db7ee5d8fa04b70bde";

async function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      const json = await res.json();
      Object.keys(json).forEach(function(key) {
        alertMessage(json[key]);
      });
      throw new Error("Bad Response");
    }
}

export default class ExternalServices {

  
    location;

    constructor() {
      this.lat = 44.34;
      this.lon = 10.99;
      this.location = {};
    }

    init() {
        if(navigator.geolocation) {
               
            navigator.geolocation.getCurrentPosition((location) => {
            if (location !== undefined) {
                setLocalStorage("location", {"latitude" : location.coords.latitude, "longitude" : location.coords.longitude});
                console.log(location.coords);
            }
                
        });
         } else {
            alert("Sorry, browser does not support geolocation!");
         }

         console.log(this.lat);
    }

    async getListAllCountries() {
        const response = await fetch(countriesEndPoint);
        const data = await convertToJson(response);
        return data;
    }
  
    async currentWeatherData (lat, lon) {

        if (lat === undefined || lon === undefined) {
            lat = this.lat;
            lon = this.lon;
        }

        const response = await fetch(openWeatherBaseURL + `weather?lat=${lat}&lon=${lon}&appid=${APIKey}`);
        const data = await convertToJson(response);
        return data;
    }

    async hourlyForecastData (lat, lon) {

        if (lat === undefined || lon === undefined) {
            const location = getLocalStorage("location");
            lat = location.latitude;
            lon = location.longitude;
        }

        const response = await fetch(openWeatherBaseURL + `forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`);
        const data = await convertToJson(response);
        return data;
    }
  
    async findCountryInfo(name, limit) {
        this.location = {};
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=${limit}&appid=${APIKey}`);
        const data = await convertToJson(response);
        return data;
    }

    async findAllCountry() {
        const response = await fetch(countriesEndPoint);
        const data = await convertToJson(response);
        return data;
    }

  }