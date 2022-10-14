var cityInput = document.getElementById('city-input')
var citySearchBtn = document.getElementById('citySearchBtn')
var cityList = document.getElementById('cityList')
var currentCity = document.getElementById('current-city')
var currentTemp = document.getElementById('current-temp')
var currentWind = document.getElementById('current-wind')
var currentHumidity = document.getElementById('current-humidity')
var forecastList = document.getElementById('forecast-list')
var largeImg = document.getElementById('large-img')
var clearHistoryBtn = document.getElementById('clearHistoryBtn')


var APIKey = "5e8c6c0488af2f64964fee765ec0afc9"
var currentDate = moment().format('MM-DD-YYYY')
// var tomorrow = moment().add(1, 'days').format('MM-DD-YYYY')


function onLoad() {
    cityList.innerHTML = ""
    var citySearches = JSON.parse(localStorage.getItem('citySearches')) || []
    for (var i = 0; i < citySearches.length; i++) {
        var cityIndex = citySearches[i]
        var li = document.createElement('li')
        li.classList.add('recentSearches')
        li.textContent = cityIndex
        li.addEventListener('click', displaySavedWeather)
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
        li.classList.add('recentSearches')
        li.textContent = cityIndex
        li.addEventListener('click', displaySavedWeather)
        cityList.appendChild(li)
    }
    getCoordinates(cityName)
    cityInput.value = ""
}

function displaySavedWeather(event) {
    var cityName2 = event.target.textContent
    var requestCoordinates = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName2 + '&limit=5&appid=' + APIKey

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

function getCoordinates(cityName) {
    var requestCoordinates = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + APIKey

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
            var weatherData = data
            displayWeather(weatherData)
        })
}       

function displayWeather(weatherData) {
    currentCity.textContent = weatherData.city.name + ' ' + currentDate
    largeImg.setAttribute('src', "https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + ".png")
    currentTemp.textContent = 'Temp: ' + (((weatherData.list[0].main.temp - 273) * 1.8) + 32).toFixed(2) + ' °F'
    currentWind.textContent = 'Wind: ' + weatherData.list[0].wind.speed + ' MPH'
    currentHumidity.textContent = 'Humidity: ' + weatherData.list[0].main.humidity + '%'
    displayForecast(weatherData)
}

function displayForecast(weatherData) {
    var weatherList = weatherData.list
    console.log(weatherList)
    forecastList.innerHTML = ""
    for (var i = 1; i < 6; i++) {
        forecastIndex = weatherList[i]
        console.log(forecastIndex)
        var fiveDayLi = document.createElement('li')
        fiveDayLi.classList.add('fiveDayInfo')
        forecastList.appendChild(fiveDayLi)
        var forecastCityHeader = document.createElement('h4')
        var forecastCityImage = document.createElement('img')
        var forecastCityTemp = document.createElement('p')
        var forecastCityWind = document.createElement('p')
        var forecastCityHumidity = document.createElement('p')

        // add image

        forecastCityHeader.textContent = moment().add(i, 'days').format('MM-DD-YYYY')
        forecastCityImage.setAttribute('class', 'small-img')
        forecastCityImage.setAttribute('src', "https://openweathermap.org/img/wn/" + forecastIndex.weather[0].icon + ".png")
        forecastCityTemp.textContent = 'Temp: ' + (((forecastIndex.main.temp - 273) * 1.8) + 32).toFixed(2) + ' °F'
        forecastCityWind.textContent = 'Wind: ' + forecastIndex.wind.speed + ' MPH'
        forecastCityHumidity.textContent = 'Humidity: ' + forecastIndex.main.humidity + '%'

        fiveDayLi.appendChild(forecastCityHeader)
        fiveDayLi.appendChild(forecastCityImage)
        fiveDayLi.appendChild(forecastCityTemp)
        fiveDayLi.appendChild(forecastCityWind)
        fiveDayLi.appendChild(forecastCityHumidity)


    }

}

function clearHistory () {
    localStorage.removeItem('citySearches')
    location.reload()
}

onLoad()
citySearchBtn.addEventListener('click', submitCity)
clearHistoryBtn.addEventListener('click', clearHistory)
