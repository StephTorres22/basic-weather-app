import { docuBody } from "./script.js";
import { body } from "./DOM.js";

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

    const city = document.createElement("h1");
    weatherCard.appendChild(city);
    city.innerText = this.location;

    const image = document.createElement("img");
    weatherCard.appendChild(image);
    image.src = this.icon;

    const currentWeather = document.createElement("h3");
    weatherCard.appendChild(currentWeather);
    currentWeather.innerText = this.weather;

    const temperature = document.createElement("h3");
    weatherCard.appendChild(temperature);
    temperature.innerText = this.temp;
  }

  /* needs a display method, similar to project/todo-list */

  /*  displayWeather() {
    console.log("are we getting here");
    let weatherCard = document.createElement("div");
    weatherCard.classList.add("weatherCard");
    docuBody.appendChild(weatherCard);

    let location = document.createElement("h1");
    weatherCard.appendChild(location);
    location.innerText = `${this.location}`;

    let temp = document.createElement("h2");
    weatherCard.appendChild(temp);
    temp.innerText = `${this.temp}`;
  } */
}
