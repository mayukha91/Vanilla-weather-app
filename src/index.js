let apiKey = "81a39b8b4f83887f2094935f304faa2f";
let url = `https://api.openweathermap.org/data/2.5/weather?q=Phoenix&appid=${apiKey}&units=metric`;

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

let min = date.getMinutes();
let dayElement = document.querySelector(".day");
let timeElement = document.querySelector(".time");

function showTemperature(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);

  let tempElement = document.querySelector("strong");
  tempElement.innerHTML = currentTemp;
  dayElement.innerHTML = `${months[month]} ${today}`;
  timeElement.innerHTML = `${hour}:${min}`;
}

axios.get(url).then(showTemperature);
