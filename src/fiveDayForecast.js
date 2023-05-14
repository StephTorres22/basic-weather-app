/* sort data by day/date */

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

export async function seperateDays(location) {
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

  let [...dup] = data.list; //data.list not mutated

  const values = Object.values(counter); //values is an array containing the different number of occurences for each date, should only be a length of 5 or 6

  console.log(values);

  //loop through values and use value at index as count for how many objects to splice.
  for (let i = 0; i < values.length; i++) {
    seperatedDays[i] = dup.splice(0, values[i]); //didn't think splice would work like this, but this is great
    //seperatedDays is now a nested array containing 3hr forecasts for each day in a 5 day period separated by date.
  }

  console.log(seperatedDays);
}
