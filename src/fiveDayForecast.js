/* sort data by day/date */

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

    const seperatedDays = [];

    const [...dup] = data.list; //data.list not mutated

    const values = Object.values(counter); //values is an array containing the different number of occurences for each date, should only be a length of 5 or 6

    console.log(values);

    //loop through values and use value at index as count for how many objects to splice.
    for (let i = 0; i < values.length; i++) {
      seperatedDays[i] = dup.splice(0, values[i]); //didn't think splice would work like this, but this is great
      //seperatedDays is now a nested array containing 3hr forecasts for each day in a 5 day period separated by date.
    }

    return seperatedDays;
  } catch {
    console.log("Unable to serperate data into seperate days");
  }
}

/* counts occurrence of each icon for each day */
export async function getDayOverviewIcon(location) {
  try {
    /* array containing each day with forecast at 3hr intervals [[],[]...]*/
    const fiveDayForecast = await seperateDays(location);

    const iconCounterArray = [];

    for (let i = 0; i < fiveDayForecast.length; i++) {
      const iconCounter = {};
      let day = fiveDayForecast[i];

      day.forEach((forecast) => {
        let icon = forecast.weather[0].icon;
        if (iconCounter[icon]) {
          iconCounter[icon] += 1;
        } else {
          iconCounter[icon] = 1;
        }
        iconCounterArray[i] = iconCounter;
      });
      console.log(iconCounter);
    }

    console.log(iconCounterArray);
  } catch {
    console.log("Unable to get icon for each day.");
  }
}
