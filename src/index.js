let apiKey = "81a39b8b4f83887f2094935f304faa2f";

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dayElement = document.querySelector(".day");
let timeElement = document.querySelector(".time");
let descElement = document.querySelector(".sub1");
let humidElement = document.querySelector("#humid");
let windElement = document.querySelector("#windy");
let visibleElement = document.querySelector("#visible");
let iconElement = document.querySelector("#icon");
let fah = document.querySelector("#fah");
let cen = document.querySelector("#cen");
let nextDay1 = document.querySelector("#day1");
let nextDay1_temp = document.querySelector("#day1_Temp");
let nextDay2 = document.querySelector("#day2");
let nextDay2_temp = document.querySelector("#day2_Temp");
let nextDay3 = document.querySelector("#day3");
let nextDay3_temp = document.querySelector("#day3_Temp");
let nextDay4 = document.querySelector("#day4");
let nextDay4_temp = document.querySelector("#day4_Temp");

function formatDate(timestamp) {
  //console.log(timestamp);
  let date = new Date(timestamp);
  let month = date.getMonth();
  let today = date.getDate();
  console.log("Date: " + today);
  return `${months[month]} ${today}`;
}

function show(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("input");
  let city = enteredCity.value;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  function showTemperature(response) {
    console.log(response.data);

    let h1 = document.querySelector("h1");
    h1.innerHTML = city;

    let currentTemp = Math.round(response.data.main.temp);

    let tempElement = document.querySelector("strong");
    tempElement.innerHTML = currentTemp;

    function replaceWithC() {
      tempElement.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
    }
    cen.addEventListener("click", replaceWithC);

    function replaceWithF() {
      let fTemp = currentTemp;
      tempElement.innerHTML = Math.round(fTemp);
    }
    fah.addEventListener("click", replaceWithF);
    let currentResponse =
      (response.data.dt +
        new Date().getTimezoneOffset() * 60 +
        response.data.timezone) *
      1000;
    //console.log(currentResponse);
    let date = new Date(currentResponse);
    console.log(date);
    let hour = date.getHours();
    //let hour = 5;
    console.log(hour);
    let min = date.getMinutes();
    if (hour < 6 || hour > 20) {
      let bg = document.querySelector(".wrapper");
      let a1 = document.querySelector("a");
      bg.style.backgroundImage = "url('src/night.jpeg')";
      bg.style.backgroundSize = "cover";
      bg.style.backgroundRepeat = "no-repeat";
      bg.style.color = "white";
      humidElement.style.color = "white";
      windElement.style.color = "white";
      visibleElement.style.color = "white";
      fah.style.color = "white";
      cen.style.color = "white";
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }

    if (min < 10) {
      min = `0${min}`;
    }
    dayElement.innerHTML = formatDate(currentResponse); //`${months[month]} ${today}`;
    timeElement.innerHTML = `${hour}:${min}`;
    descElement.innerHTML = response.data.weather[0].description;
    humidElement.innerHTML = `Humidity:${Math.round(
      response.data.main.humidity
    )}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
    visibleElement.innerHTML = `Visibility:${Math.round(
      response.data.visibility / 1000
    )} mi`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    /*let coord = [lat, lon];*/
    var coord = new Object();
    coord[0] = lat;
    coord[1] = lon;
    //console.log(coord);
    return coord;
  }

  let x = axios.get(url).then(showTemperature);
  //console.log(x);
  let val = Promise.resolve(x);
  val.then(function (v) {
    //console.log(v[0]);
    //console.log(v[1]);
    let lat = v[0];
    let lon = v[1];
    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    function daily(response) {
      console.log(response.data);
      //console.log(formatDate(response.data.daily[1].dt * 1000));
      /* let currentResponse =
        response.data.daily[0].dt * 1000 + response.data.daily[0].dt * 1000;
      let date = new Date(currentResponse);
      console.log(date);
      let hour = date.getHours();
      console.log(hour);
      let min = date.getMinutes();
      dayElement.innerHTML = formatDate(currentResponse); //`${months[month]} ${today}`;
      timeElement.innerHTML = `${hour}:${min}`;*/
      nextDay1.innerHTML = formatDate(
        (response.data.daily[1].dt + response.data.timezone_offset) * 1000
      );
      nextDay1_temp.innerHTML = `${Math.round(
        response.data.daily[1].temp.max
      )}°/ ${Math.round(response.data.daily[1].temp.min)}°`;

      nextDay2.innerHTML = formatDate(
        (response.data.daily[2].dt + response.data.timezone_offset) * 1000
      );
      nextDay2_temp.innerHTML = `${Math.round(
        response.data.daily[2].temp.max
      )}°/ ${Math.round(response.data.daily[2].temp.min)}°`;

      nextDay3.innerHTML = formatDate(
        (response.data.daily[3].dt + response.data.timezone_offset) * 1000
      );
      nextDay3_temp.innerHTML = `${Math.round(
        response.data.daily[3].temp.max
      )}°/ ${Math.round(response.data.daily[3].temp.min)}°`;

      nextDay4.innerHTML = formatDate(
        (response.data.daily[4].dt + response.data.timezone_offset) * 1000
      );
      nextDay4_temp.innerHTML = `${Math.round(
        response.data.daily[4].temp.max
      )}°/ ${Math.round(response.data.daily[4].temp.min)}°`;
    }
    axios.get(url2).then(daily);
  });
}
let button = document.querySelector(".search");
button.addEventListener("click", show);
