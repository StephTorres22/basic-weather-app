export const body = document.querySelector("body");

export const expandButtonArray = [];
export const removeButtonArray = [];
export const weatherCardArray = [];

export function createWeatherCard(location, temp, weather, icon) {
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weatherCard");

  body.appendChild(weatherCard);

  const city = document.createElement("h1");
  weatherCard.appendChild(city);
  city.innerText = location;

  const image = document.createElement("img");
  weatherCard.appendChild(image);
  image.src = icon;

  const currentWeather = document.createElement("h3");
  weatherCard.appendChild(currentWeather);
  currentWeather.innerText = weather;

  const temperature = document.createElement("h3");
  weatherCard.appendChild(temperature);
  temperature.innerText = temp;
}

export function removeCards() {
  if (body.hasChildNodes !== true) {
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  }
}

window.weatherCardArray = weatherCardArray;
