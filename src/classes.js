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
    headerDiv.classList.add("cardHeader");

    const cardMiddle = document.createElement("div");
    weatherCard.appendChild(cardMiddle);
    cardMiddle.classList.add("cardMiddle");

    const image = document.createElement("img");
    cardMiddle.appendChild(image);
    image.src = this.icon;

    const currentWeather = document.createElement("h3");
    cardMiddle.appendChild(currentWeather);
    currentWeather.innerText = this.weather;

    const footerDiv = document.createElement("div");
    weatherCard.appendChild(footerDiv);
    footerDiv.classList.add("cardFooter");

    const temperature = document.createElement("h3");
    footerDiv.appendChild(temperature);
    temperature.innerText = this.temp.toFixed(1); //now a string, also to 1 D.P rounded.

    const expandButton = document.createElement("button");
    expandButton.setAttribute("type", "button");
    const expandButtonImage = document.createElement("img");
    expandButtonImage.setAttribute("src", "/assets/arrow-expand.svg");
    expandButtonArray.push(expandButton);
    expandButton.appendChild(expandButtonImage);
    footerDiv.appendChild(expandButton);
  }
}
