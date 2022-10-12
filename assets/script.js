var cityInput = document.getElementById('city-input')
var citySearchBtn = document.getElementById('citySearchBtn')


var APIKey = "5e8c6c0488af2f64964fee765ec0afc9"

function submitCity() {
    console.log(cityInput.value.trim())
    cityName = cityInput.value.trim()
    getCoordinates(cityName)
    cityInput.value = ""
}


function getCoordinates(cityName) {
    var requestCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + APIKey

    fetch(requestCoordinates)
        .then(function (response2) {
            return response2.json()
        })
        .then(function (data) {
            var lat = data[0].lat
            var lon = data[0].lon
            getWeather(lat, lon)
        })
}

function getWeather(lat, lon) {
    var requestWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey

    fetch(requestWeather)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
}       

citySearchBtn.addEventListener('click', submitCity)
