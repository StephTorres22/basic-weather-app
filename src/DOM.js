/* add expand button for each 5day card to display weather for each 3hour interval.

maybe add day as well as day 

style cards 

extra info for current weather,

current weather refresh

find a decent font 

slider for f and c temp

style search bar

would be could to have a city search so you get the right country,
or implement geohandler*/



import { currentSearchResults } from "./script.js";

export const body = document.querySelector("body");

export const weatherCardArray = [];

const topDiv = document.querySelector(".top");
const bottomDiv = document.querySelector(".bottom");

const currentWeatherCard = document.querySelector(".currentWeatherCard");

export const currentCoditionsDiv = document.querySelector(
  "[data-weather-conditions]"
);
export const locationTimeDate = document.querySelector(
  "[data-location-time-date]"
);

export const searchDiv = document.querySelector(".searchDiv");

export function displayCurrentWeather(temp, weather, icon, city, countryCode) {
  const image = document.createElement("img");
  currentCoditionsDiv.appendChild(image);
  image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const condition = document.createElement("h1");
  currentCoditionsDiv.appendChild(condition);
  condition.innerText = weather;

  const temperature = document.createElement("h3");
  currentCoditionsDiv.appendChild(temperature);
  temperature.innerText = temp.toFixed(1) + "\u00B0";

  const location = document.createElement("h1");
  locationTimeDate.appendChild(location);
  location.innerText = city + ",";

  const country = document.createElement("h2");
  locationTimeDate.appendChild(country);
  country.innerText = countryCode;
}

export const fiveDayWeatherCardArray = Array.from(
  document.querySelectorAll("[data-five-day-weathercard]")
);
export function createFiveDayWeatherCard(
  weekday,
  icon,
  minTemp,
  maxTemp,
  parent
) {
  const day = document.createElement("h3");
  parent.appendChild(day);
  day.innerText = weekday;

  const image = document.createElement("img");
  parent.appendChild(image);
  image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const maximun = document.createElement("h4");
  parent.appendChild(maximun);
  maximun.innerText = maxTemp.toFixed(1) + "\u00B0";

  const minimum = document.createElement("h4");
  parent.appendChild(minimum);
  minimum.innerText = minTemp.toFixed(1) + "\u00B0";

  
}

/*  

    const removeButton = document.createElement("button");
    removeButtonArray.push(removeButton);
    headerDiv.appendChild(removeButton);
    const removeButtonImage = document.createElement("img");
    removeButtonImage.setAttribute("src", "./assets/window-close.svg");
    removeButton.appendChild(removeButtonImage);

    const cardMiddle = document.createElement("div");
    weatherCard.appendChild(cardMiddle);
    cardMiddle.classList.add("cardMiddle");

    const image = document.createElement("img");
    cardMiddle.appendChild(image);
    image.src = `https://openweathermap.org/img/wn/${this.icon}@2x.png`

    const currentWeather = document.createElement("h3");
    cardMiddle.appendChild(currentWeather);
    currentWeather.innerText = this.weather;

    const footerDiv = document.createElement("div");
    weatherCard.appendChild(footerDiv);
    footerDiv.classList.add("cardFooter");

    const temperature = document.createElement("h3");
    footerDiv.appendChild(temperature);
    temperature.innerText = this.temp.toFixed(1) + '\u00B0'; //now a string, also to 1 D.P rounded.

    const expandButton = document.createElement("button");
    expandButton.setAttribute("type", "button");
    const expandButtonImage = document.createElement("img");
    expandButtonImage.setAttribute("src", "./assets/arrow-expand.svg");
    expandButtonArray.push(expandButton);
    expandButton.appendChild(expandButtonImage);
    footerDiv.appendChild(expandButton); */
export function removeElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function removeElementsFromFiveDayForecastCards(){
  for(let i = 0; i<fiveDayWeatherCardArray.length; i++){
    removeElements(fiveDayWeatherCardArray[i]);
  }
}

window.weatherCardArray = weatherCardArray;
