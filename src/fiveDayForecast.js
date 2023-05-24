/* sort data by day/date */

/* want min max temps for each day, icon, date/day */

/* gets 5 day 3hr interval forecast */
async function getFiveDayForecast(place) {
  place = city.value || place;
  try {
    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=f0c63b9adde40dfb29e7181d535c8598&units=metric`,
      { mode: "cors" }
    );
    //contains an array of 40 elements, 8 forecast objs at 3hrs intervals for each day.

    /* given date and time as text, so could split up objs into seperate day obj into an array.
      loop through to get the most common occurence of weather condition, use corresponding code to set icon
      use that as rough forecast for the day,
      take lowest and highest temp for the day as temp range */
    const data = await forecast.json();

    return data;
  } catch {
    console.log("Unable to fetch five day forecast");
  }
}

/* uses 5day forercast and returns an array of each day, each containing 3hour forecast intervals  */
export async function seperateDays(location) {
  try {
    const data = await getFiveDayForecast(location);
    const dates = [];

    /* creates array populated by the date of each 3hr weather obj, i.e [14, 14, 14, 15, 15 ...etc] */
    for (let i = 0; i < data.list.length; i++) {
      const dateTime = new Date(data.list[i].dt_txt);
      const date = dateTime.getDate();
      dates.push(date);
    }
    /* counts occurences of each date, first and last will be less than or equal to 8, middle dates will be 8.
  use this to count indexes */
    const counter = {};
    /* finds how many objects for each days are in the list, will be able to seperate list into days */
    dates.forEach((date) => {
      if (counter[date]) {
        counter[date] += 1;
      } else {
        counter[date] = 1;
      }
    });

    const seperatedDayObjects = [];
    const [...dup] = data.list; //data.list not mutated

    const values = Object.values(counter); //values is an array containing the different number of occurences for each date, should only be a length of 5 or 6
    //loop through values and use value at index as count for how many objects to splice.
    for (let i = 0; i < values.length; i++) {
      seperatedDayObjects[i] = dup.splice(0, values[i]); //didn't think splice would work like this, but this is great
      //seperatedDays is now a nested array containing 3hr forecasts for each day in a 5 day period separated by date.
    }

    seperatedDayObjects.pop(); //gets rid of last day as isn't a full day and now have five objects to play with.

    const icons = getDayOverviewIcon(seperatedDayObjects);
    const minMaxTemps = getMinMaxTempPerDay(seperatedDayObjects);
    const weekdays = getDay(seperatedDayObjects);

    const fiveDayForecastObjectArray = [];

    for (let i = 0; i < seperatedDayObjects.length; i++) {
      const dayObj = createDayObj(
        weekdays[i],
        icons[i],
        minMaxTemps[i][0],
        minMaxTemps[i][1]
      );
      fiveDayForecastObjectArray[i] = dayObj;
    }
    console.log(fiveDayForecastObjectArray);
    return fiveDayForecastObjectArray;
  } catch {
    console.log("Unable to seperate data into seperate days");
  }
}

/* counts occurrence of each icon for each day, gets most frequent, pushes it to array, returns array containing iconcode for each day.*/
function getDayOverviewIcon(array) {
  /* array containing each day with forecast at 3hr intervals [[],[]...]*/
  //array containing obj, icon and occurence
  const iconCounterArray = [];
  //array containting just occurences of each icon in nested array for each day
  const occurencesPerDay = [];
  const highestOccurencePerDay = [];
  const dayOverviewIcon = [];

  //loop for populating above arrays
  for (let i = 0; i < array.length; i++) {
    const iconCounter = {};
    let day = array[i];

    day.forEach((forecast) => {
      let icon = forecast.weather[0].icon;
      if (iconCounter[icon]) {
        iconCounter[icon] += 1;
      } else {
        iconCounter[icon] = 1;
      }

      iconCounterArray[i] = iconCounter;
      occurencesPerDay[i] = Object.values(iconCounterArray[i]);
      // dayOverviewIcon.push(Math.max(...iconCounterArray[i]));
    });
  }

  /* is this all surplus and can be done in the first nested loop?... */

  //this works just to get max value of each day, can probably loop through occurencesPerDay
  occurencesPerDay.forEach((day) => {
    highestOccurencePerDay.push(Math.max(...day));
  });

  /* Loops through each obj in iconCounterArray, compares values to highestOccurence..[i] and pushes key to dayOverviewIconArray at the relevant index. */
  for (let i = 0; i < iconCounterArray.length; i++) {
    let day = iconCounterArray[i];

    for (const [key, value] of Object.entries(day)) {
      if (value === highestOccurencePerDay[i]) {
        dayOverviewIcon[i] = key;
      }
    }
  }

  return dayOverviewIcon;
}

/* gets min and max temps for each day */
function getMinMaxTempPerDay(array) {
  const allTemps = [];
  const minMaxTemps = [];

  for (let i = 0; i < array.length; i++) {
    let day = array[i];
    let dayTemp = [];
    day.forEach((interval) => {
      dayTemp.push(interval.main.temp_min);
      dayTemp.push(interval.main.temp_max);
      allTemps[i] = dayTemp;
    });
  }

  allTemps.forEach((day, index) => {
    minMaxTemps[index] = [];
    minMaxTemps[index].push(Math.min(...day));
    minMaxTemps[index].push(Math.max(...day));
  });

  return minMaxTemps;
}

/* gets day of the week for each day  */
function getDay(array) {
  const dayArray = [];
  const options = { weekday: "short" };

  for (let i = 0; i < array.length; i++) {
    let day = array[i];
    let date = new Date(day[0].dt_txt);
    let weekday = new Intl.DateTimeFormat("en-GB", options).format(date);
    dayArray.push(weekday);
  }

  return dayArray;
}

//factory for creating objs of each day using corresponding arrays to assign values
function createDayObj(weekday, icon, minTemp, maxTemp) {
  return { weekday, icon, minTemp, maxTemp };
}
