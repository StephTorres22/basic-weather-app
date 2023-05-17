import { currentSearchResults } from "./script.js";

export const body = document.querySelector("body");

export const weatherCardArray = [];

const topDiv = document.querySelector(".top");
const bottomDiv = document.querySelector(".bottom");

const currentWeatherCard = document.querySelector(".currentWeatherCard");

export const currentCoditionsDiv = document.querySelector(
  "[data-weather-conditions]"
);
export const locationTimeDate = document.querySelector("[data-location-time-date]");

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

  const location = document.createElement('h1');
  locationTimeDate.appendChild(location);
  location.innerText = city +','

  const country = document.createElement('h2');
  locationTimeDate.appendChild(country);
  country.innerText = countryCode;
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
export function removeCards() {
  while (cardHolder.firstChild) {
    cardHolder.removeChild(cardHolder.firstChild);
  }
  for (let i = 0; i < weatherCardArray.length; i++) {
    weatherCardArray.splice(i, 1);
  }
}

window.weatherCardArray = weatherCardArray;
