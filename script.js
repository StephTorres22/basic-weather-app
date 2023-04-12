/* Takes location from input bar a value
plug that into API key
process that data and display
toggle between cel and fahr

use fetch, asyn await*/

const city = document.getElementById("city");
const getWeatherBtn = document.getElementById("getWeatherBtn");

getWeatherBtn.addEventListener("click", (e) => {
  e.preventDefault;
  getWeather();
});

async function getWeather(place = "London", country = "uk") {
  place = city.value || place; //this calls either the value of input, or default value
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=f0c63b9adde40dfb29e7181d535c8598`,
    { mode: "cors" }
  );
  const data = await weatherData.json();
  console.log(data);
  console.log(data.main);
}

getWeather();
