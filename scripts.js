// After loading the page, execute the first function

$(document).ready(function() {
  geoFindMe();
});



// Set global variables
var latitude = "";
var longitude = "";
var weatherURL = "";
var weatherData = {};

// Get the location from the browser
function geoFindMe() {
  var output = document.getElementById("data");

  if (!navigator.geolocation){
    output.innerHTML = "Geolocation is not supported by your browser";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    output.innerHTML = 'Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°';

    getWeatherDetail();

    }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "Locating…";

  navigator.geolocation.getCurrentPosition(success, error);
}

// Pull the weather from openweathermap and post the weather on the page
function getWeatherDetail() {
  //weatherURL = ;

  var output = $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&APPID=09449d6c9c3b937d6a67e55e34b1bfab",
    type: 'GET',
    data: {},
    dataType: 'json',
    success: function(data) {
    // assign the weatherData for future use, and set the page values to current weather
      weatherData = data;
      console.log(weatherData);
      document.getElementById("city").innerHTML = weatherData.name;
     	document.getElementById("temp").innerHTML = Math.round(weatherData.main.temp) + '° F';
      document.getElementById("conditions").innerHTML = weatherData.weather[0].description;
      changeBackgroundImg(weatherData.weather[0].main);
    },
    error: function(err) { alert(err); },
  });
};

// change the background image

function changeBackgroundImg(group) {
  document.body.style.backgroundImage = "url(https://s3.amazonaws.com/assetsanewdevio/fccweather/" + group + ".jpg)";
}
