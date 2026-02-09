const inputCity = document.getElementById('cityInput')
const infoWeather = document.getElementById('infoWeather')
const btnSearch = document.getElementById('searchBtn')

async function findWeather(){
    const city = inputCity.value
    const apiKey = ''
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`

    try {
        const response = await fetch(url)
        const data = await response.json()

        renderWeather(data)

    } catch (error) {
        alert(`Error: ${error.message}`)
    }

}

function renderWeather( data ){

    const temperature = data.main.temp

    const infoContent = document.createElement('div')
    infoContent.classList.add('info-content')

    infoContent.innerHTML = `
        <h2>Ciudad: ${data.name}</h2>
        <h2>Temperatura: ${temperature}°C</h2>
        <h3>Humedad: ${ data.main.humidity }%</h3>
        <p><strong>Clima:</strong> ${data.weather[0].description}</p>
        `
    
    infoWeather.appendChild(infoContent)
}

btnSearch.addEventListener('click', findWeather)

