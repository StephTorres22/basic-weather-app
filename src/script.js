/* Takes location from input bar a value
plug that into API key
process that data and display
toggle between cel and fahr

unix conversion function.

decide what information you want to display.

need a function to refresh display each time btn is clicked
use fetch, asyn await*/
import "../src/style.css";
import weatherConditionsData from "../weatherCondition.json"; //this accessible straight away!

const docuBody = document.querySelector("body");
const city = document.getElementById("city");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const header = document.getElementById("h1");

getWeatherBtn.addEventListener("click", (e) => {
  e.preventDefault;
  getWeather();
  setBackGroundColour();
});

async function getWeather(place = "London", country = "uk") {
  place = city.value || place; //this calls either the value of input, or default value
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=f0c63b9adde40dfb29e7181d535c8598&units=metric`, //&units changes whether standard cel or far
    { mode: "cors" }
  );
  const data = await weatherData.json();
  console.log(data);
  console.log(data.main);
  /*  displayData(data.weather[0].main);
  displayData(convertUnixToDate(data.sys.sunrise));
  displayData(convertUnixToDate(data.sys.sunset)); */
  return data;
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

function displayData(data) {
  let newHeader = document.createElement("h1");
  document.body.appendChild(newHeader);
  newHeader.innerText = data;
}

/* declare async so we can use await to wait from data from getWeather to return
getWeather returns obj that we can access different values of from dot notation. */
async function getTemp() {
  try {
    const data = await getWeather();
    const temp = await data.main.temp;
    displayData(temp);
  } catch {
    console.log("not reading weather temp");
  }
}

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

  async function getCurrentWeatherId() {
    try {
      const data = await getWeather();
      const id = await data.weather[0].id;
      return id;
    } catch {
      console.log("Couldn't get current weather id");
    }
  }

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

  //could set background colour based of id numbers, store in different arrays and check if id is present in each.
}
setBackGroundColour();
getWeather();
getTemp();
