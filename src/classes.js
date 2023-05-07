import { body } from "./DOM.js";
import { expandButtonArray, removeButtonArray } from "./script.js";

export class WeatherItem {
  constructor(location, temp, weather, description, icon) {
    this.location = location;
    this.temp = temp;
    this.weather = weather;
    // this.description = description;
    this.icon = icon;
  }

  createWeatherCard() {
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weatherCard");
    body.appendChild(weatherCard);

    const headerDiv = document.createElement("div");
    weatherCard.appendChild(headerDiv);

    const city = document.createElement("h1");
    headerDiv.appendChild(city);
    city.innerText = this.location;

    const removeButton = document.createElement("button");
    removeButtonArray.push(removeButton);
    headerDiv.appendChild(removeButton);
    headerDiv.classList.add('cardHeader')

    const image = document.createElement("img");
    weatherCard.appendChild(image);
    image.src = this.icon;

    const currentWeather = document.createElement("h3");
    weatherCard.appendChild(currentWeather);
    currentWeather.innerText = this.weather;

    const temperature = document.createElement("h3");
    weatherCard.appendChild(temperature);
    temperature.innerText = this.temp.toFixed(1); //now a string, also to 1 D.P rounded.
  }
}
