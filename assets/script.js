var cityInput = document.getElementById('city-input')
var citySearchBtn = document.getElementById('citySearchBtn')
var cityList = document.getElementById('cityList')

var APIKey = "5e8c6c0488af2f64964fee765ec0afc9"

function onLoad() {
    cityList.innerHTML = ""
    var citySearches = JSON.parse(localStorage.getItem('citySearches')) || []
    for (var i = 0; i < citySearches.length; i++) {
        var cityIndex = citySearches[i]
        var li = document.createElement('li')
        li.textContent = cityIndex
        cityList.appendChild(li)
    }
}

function submitCity() {
    cityList.innerHTML = ""
    cityName = cityInput.value.trim()
    var citySearches = JSON.parse(localStorage.getItem('citySearches')) || []
    citySearches.push(cityName)
    localStorage.setItem('citySearches', JSON.stringify(citySearches))
    for (var i = 0; i < citySearches.length; i++) {
        var cityIndex = citySearches[i]
        var li = document.createElement('li')
        li.textContent = cityIndex
        cityList.appendChild(li)
    }
    
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

onLoad()
citySearchBtn.addEventListener('click', submitCity)
