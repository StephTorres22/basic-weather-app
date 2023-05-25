/* Takes location from input bar a value
plug that into API key
process that data and display
toggle between cel and fahr

unix conversion function.



need a function to refresh display each time btn is clicked

expand button functionality, 5day forcast,

remover button functionality, remove card and weatherItem

c - f toggle for temp

display local time for each current weatherItem/card? 








display time and date?...*/
import "../src/style.css";
import weatherConditionsData from "../weatherCondition.json"; //this accessible straight away!
import { WeatherItem } from "./classes.js";
import {
  cardHolder,
  createWeatherCard,
  weatherCardArray,
  removeCards,
  displayCurrentWeather,
  createFiveDayWeatherCard,
  fiveDayWeatherCardArray,
  removeElementsFromFiveDayForecastCards,
  removeElements,
  currentCoditionsDiv,
  locationTimeDate,
  createThreeHourIntervalCard,
  modal,
  expandButtonArray,
} from "./DOM.js";

import { seperateDays } from "./fiveDayForecast.js";

const city = document.getElementById("city");
const getWeatherBtn = document.getElementById("getWeatherBtn");

export const currentSearchResults = [];

getWeatherBtn.addEventListener("click", (e) => {
  e.preventDefault;
  removeElements(currentCoditionsDiv);
  removeElements(locationTimeDate);
  removeElementsFromFiveDayForecastCards();
  renderCurrentWeather();
  renderFiveDayForecast();
  city.value = "";
});

/* REMEMBER TO DELETE COUNT, ONLY USING TO SEE HOW MANY CALLS ARE MADE TO  */
export let count = 0;

async function getWeather(place, country = "uk") {
  /* try catch, handle errors! */
  place = city.value || place; //this calls either the value of input, or default value
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=f0c63b9adde40dfb29e7181d535c8598&units=metric`, //&units changes whether standard cel or far
    { mode: "cors" }
  );
  const data = await weatherData.json();
  count++;
  console.log(count);

  const currentWeather = {};
  currentWeather.location = data.name; //+ ", " + data.sys.country;
  currentWeather.conditon = data.weather[0].main;
  currentWeather.temp = data.main.temp;
  currentWeather.description = data.weather[0].description;
  currentWeather.iconNumber = data.weather[0].icon;
  currentWeather.country = data.sys.country;

  currentWeather.sunrise = data.sys.sunrise;
  currentWeather.sunset = data.sys.sunset;
  /* 
  displayData(convertUnixToDate(data.sys.sunrise));
  displayData(convertUnixToDate(data.sys.sunset)); */
  return currentWeather;
}

/* everything will be waiting on this!, does that mean they need to be async functions */
/* time zone is referenced in seconds +/- of GMT currently uk is 3600, an hour ahead/BST
    dt stands for date time, time stamp using unix time stamp, counts in seconds from jan 1st 1970 UTC
    need to mulitply these numbers but 1000, to use in js, js works in milliseconds */

function convertUnixToDate(unix) {
  const unixToMilliseconds = unix * 1000;
  const date = new Date(unixToMilliseconds);
  return date.toLocaleString();
  //or toLocalTimeString, just gives actual time
}

/* RENDER WEATHER DATA FUNCTIONS */

async function renderCurrentWeather(location) {
  let data = await getWeather(location);
  displayCurrentWeather(
    data.temp,
    data.conditon,
    data.iconNumber,
    data.location,
    data.country
  );
}

async function renderFiveDayForecast(location) {
  const data = await seperateDays(location);
  /* need to do a full call to recieve complete promise and then split it */
  const daysObjArray = data.minimalData;
  const intervalObjArray = data.completeData;

  daysObjArray.forEach((day, i) => {
    createFiveDayWeatherCard(
      day.weekday,
      day.icon,
      day.minTemp,
      day.maxTemp,
      fiveDayWeatherCardArray[i]
    );
  });

  expandButtonArray.forEach((button, index) => {
    button.addEventListener("click", (e) => {
     // console.log(index, e.target);

       if (e.target == expandButtonArray[index]) {
        console.log(index);
        renderThreeHourIntervals(intervalObjArray, index);
        modal.showModal();
      } 
    });
  });
}

function renderThreeHourIntervals(array, index) {
  array[index].forEach((interval) => {
    createThreeHourIntervalCard(
      interval.dt_txt,
      interval.weather[0].icon,
      interval.weather[0].main,
      interval.weather[0].description,
      interval.main.temp,
      interval.wind.speed,
      modal
    );
  });
}

renderCurrentWeather("London");
renderFiveDayForecast("London");

//setInterval(updateCards, 60000); // turned to half minute for dev
window.currentSearchResults = currentSearchResults;
//window.removeButtonArray = removeButtonArray
