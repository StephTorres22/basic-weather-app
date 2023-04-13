/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* Takes location from input bar a value\nplug that into API key\nprocess that data and display\ntoggle between cel and fahr\n\nunix conversion function.\n\ndecide what information you want to display.\n\nneed a function to refresh display each time btn is clicked\nuse fetch, asyn await*/\n\n/* import fs from \"fs\";\n\nconst weatherConditionsData = fs.readFileSync(\n  \"./weatherCondtion.json\",\n  \"utf-8\"\n); */\n\nconst city = document.getElementById(\"city\");\nconst getWeatherBtn = document.getElementById(\"getWeatherBtn\");\nconst header = document.getElementById(\"h1\");\n\ngetWeatherBtn.addEventListener(\"click\", (e) => {\n  e.preventDefault;\n  getWeather();\n});\n\nasync function getWeather(place = \"London\", country = \"uk\") {\n  place = city.value || place; //this calls either the value of input, or default value\n  const weatherData = await fetch(\n    `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=f0c63b9adde40dfb29e7181d535c8598&units=metric`, //&units changes whether standard cel or far\n    { mode: \"cors\" }\n  );\n  const data = await weatherData.json();\n  console.log(data);\n  console.log(data.main);\n  displayData(data.weather[0].main);\n  displayData(convertUnixToDate(data.sys.sunrise));\n  displayData(convertUnixToDate(data.sys.sunset));\n  return data;\n  //returning data this way, not as obj{}, means we have access to it outside of this function! very cool\n}\n/* everything will be waiting on this!, does that mean they need to be async functions */\n/* time zone is referenced in seconds +/- of GMT currently uk is 3600, an hour ahead/BST\n    dt stands for date time, time stamp using unix time stamp, counts in seconds from jan 1st 1970 UTC\n    need to mulitply these numbers but 1000, to use in js, js works in milliseconds */\n\nfunction convertUnixToDate(unix) {\n  const unixToMilliseconds = unix * 1000;\n  const date = new Date(unixToMilliseconds);\n  return date.toLocaleString();\n  //or toLocalTimeString, just gives actual time\n}\n\nfunction displayData(data) {\n  let newHeader = document.createElement(\"h1\");\n  document.body.appendChild(newHeader);\n  newHeader.innerText = data;\n}\n\n/* declare async so we can use await to wait from data from getWeather to return\ngetWeather returns obj that we can access different values of from dot notation. */\nasync function getTemp() {\n  try {\n    const data = await getWeather();\n    const temp = await data.main.temp;\n    displayData(temp);\n  } catch {\n    console.log(\"not gettign here\");\n  }\n}\n\n/* async function setBackGroundColour(){\n\n  //could set background colour based of id numbers, store in different arrays and check if id is present in each.\n  const \n\n  try{\n    const data = await getWeather();\n    const weatherID = data.weather[0].id;\n\n    if(weather == )\n  }\n} */\n\nweatherConditionsData();\ngetWeather();\ngetTemp();\n\n\n//# sourceURL=webpack://basic-weather-app/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;