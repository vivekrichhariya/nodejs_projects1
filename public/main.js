const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

// fetch weather data from API

const fetchWeather = async (city) =>{
    const url = `/api?q=${city}`
    const res = await fetch(url)
    const data = await res.json()

    if(data.cod === '404'){
        alert('City not found')
        return
    }

    if(data.cod === '401'){
        alert('Invalid API Key')
        return
    }

    const displayData = {
        city : data.name,
        temp : kelvinToCelcius(data.main.temp)
    }

    addWeatherToDOM(displayData)

}

const addWeatherToDOM = (data) =>{
    weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;C</h2>
    `
    cityInput.value = ''
}

const kelvinToCelcius = (temp)=>{
    const fahrenheit = ((temp - 273.15)*9)/5 + 32 
    return Math.ceil((fahrenheit-32)* 5/9) 
}

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(cityInput.value === ''){
    alert('Please enter a city')
    }else{
        fetchWeather(cityInput.value)
    }

})

// Iniial fetch
fetchWeather('Delhi')