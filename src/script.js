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
} from "./DOM.js";

const city = document.getElementById("city");
const getWeatherBtn = document.getElementById("getWeatherBtn");

export const currentSearchResults = [];

getWeatherBtn.addEventListener("click", (e) => {
  e.preventDefault;
  createNewWeatherItem();
  city.value = "";
});

let count = 0;
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

  console.log[data];

  const currentWeather = {};
  currentWeather.location = data.name; //+ ", " + data.sys.country;
  currentWeather.conditon = data.weather[0].main;
  currentWeather.temp = data.main.temp;
  currentWeather.description = data.weather[0].description;
  currentWeather.iconNumber = data.weather[0].icon;
  currentWeather.country = data.sys.country;
  /* 
  displayData(convertUnixToDate(data.sys.sunrise));
  displayData(convertUnixToDate(data.sys.sunset)); */
  return currentWeather;
  //returning data this way, not as obj{}, means we have access to it outside of this function! very cool
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

async function createNewWeatherItem(location) {
  let data = await getWeather(location);
  let newWeatherItem = new WeatherItem(
    data.location,
    data.temp,
    data.conditon,
    data.description,
    data.iconNumber,
    data.country
  );

  //should probably abstract this into a serparate function that takes array and weatherItem as parametres...?
  //updateCards()//need to change where the cards go!;
  //checks to see if there are any current searches
  if (currentSearchResults.length === 0) {
    currentSearchResults.push(newWeatherItem);
    newWeatherItem.createWeatherCard();
  } else {
    for (let i = 0; i < currentSearchResults.length; i++) {
      let weatherItem = currentSearchResults[i];


      //checks for any duplicate locations, probably need to add country to this condition, case Chester
      if (
        weatherItem.location == newWeatherItem.location &&
        weatherItem.country == newWeatherItem.country
      ) {
        weatherCardArray.splice(i, 1);
        currentSearchResults.splice(i, 1, newWeatherItem);
        //cardHolder.removeChild(targetDiv);
        removeCards();
        currentSearchResults.forEach((weatherItem) => {
          weatherItem.createWeatherCard();
        });
      } else {
        currentSearchResults.push(newWeatherItem);
        newWeatherItem.createWeatherCard();
      }

    }
  }
}

function updateCards() {
  for (let i = 0; i < currentSearchResults.length; i++) {
    createNewWeatherItem(currentSearchResults[i].location);
  }
}

/* async function displayWeather() {
  for (let i = 0; i < currentSearchResults.length; i++) {
    let search = currentSearchResults[i];
    let location = search.location;
    let temp = search.temp;
    let weather = search.weather;
    let icon = search.icon;

    createWeatherCard(location, temp, weather, icon);
  }
} */

async function setBackGroundColour() {
  // const overcasteColour = "rgb(109, 104, 104)";
  const sunnyColouredIDs = [500, 800, 801];
  const overcasteColouredIDs = [
    200, 210, 230, 231, 300, 301, 520, 741, 701, 802, 803, 600, 612, 615, 521,
    201, 311, 321, 313, 511, 501, 522, 601, 611, 613, 620, 621, 721, 804,
  ];
  const gloomyColouredIDs = [
    202, 211, 212, 221, 232, 302, 312, 314, 502, 503, 504, 531, 602, 616, 622,
    711, 731, 761, 762, 771, 781,
  ];

  /* put in try catch handle your errors! */
  const currentWeatherId = await getCurrentWeatherId();

  if (sunnyColouredIDs.includes(currentWeatherId)) {
    docuBody.style.backgroundColor = "var(--sunny-colour)";
  }

  if (gloomyColouredIDs.includes(currentWeatherId)) {
    docuBody.style.backgroundColor = "var(--gloomy-colour)";
  }

  if (overcasteColouredIDs.includes(currentWeatherId)) {
    docuBody.style.backgroundColor = "var(--overcaste-colour)";
  }

  /* probably won't use this, also maybe a way of using a loop solution to rather than the repetitive if statement. */
  //could set background colour based of id numbers, store in different arrays and check if id is present in each.
}

function displayData(data) {
  let newHeader = document.createElement("h1");
  document.body.appendChild(newHeader);
  newHeader.innerText = data;
}

createNewWeatherItem("London");
setInterval(updateCards, 60000);
window.currentSearchResults = currentSearchResults;
//window.removeButtonArray = removeButtonArray;
//window.expandButtonArray = expandButtonArray;
