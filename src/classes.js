import { body, cardHolder, expandButtonArray, removeButtonArray, weatherCardArray } from "./DOM.js";


/* refresh method to check that display is up to date and correct */

export class WeatherItem {
  constructor(location, temp, weather, decription, icon, country) {
    this.location = location;
    
    this.temp = temp;
    this.weather = weather;
    // this.description = description;
    this.icon = icon;
    this.country = country
  }

  createWeatherCard() {
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weatherCard");
    weatherCardArray.push(weatherCard);
    cardHolder.appendChild(weatherCard);

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("cardHeader");
    weatherCard.appendChild(headerDiv);

    const city = document.createElement("h1");
    headerDiv.appendChild(city);
    city.innerText = this.location + ', ' + this.country;

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
    footerDiv.appendChild(expandButton);
  }




}
