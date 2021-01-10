let apiKey = "81a39b8b4f83887f2094935f304faa2f";

let date = new Date();

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
let month = date.getMonth();

let today = date.getDate();
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = date.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let dayElement = document.querySelector(".day");
let timeElement = document.querySelector(".time");
let descElement = document.querySelector(".sub1");
let humidElement = document.querySelector("#humid");
let windElement = document.querySelector("#windy");
let visibleElement = document.querySelector("#visible");
let iconElement = document.querySelector("#icon");

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

    dayElement.innerHTML = `${months[month]} ${today}`;
    timeElement.innerHTML = `${hour}:${min}`;
    descElement.innerHTML = response.data.weather[0].description;
    humidElement.innerHTML = `Humidity:${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
    visibleElement.innerHTML = `Visibility:${
      response.data.visibility / 1000
    } mi`;
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
    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    function daily(response) {
      console.log(response.data);
    }
    axios.get(url2).then(daily);
  });
}
let button = document.querySelector(".search");
button.addEventListener("click", show);
