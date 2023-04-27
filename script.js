const apiKey = 'd96c31f827c34768313a36e97e723dd8'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords
      const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const { name, sys, main, weather } = data
          document.getElementById('city').textContent = name
          document.getElementById('country').textContent = sys.country
          document.getElementById('temp').textContent = `${Math.round(
            main.temp
          )}°C`
          document.getElementById('desc').textContent = weather[0].description
          document.getElementById(
            'icon'
          ).src = `https://openweathermap.org/img/w/${weather[0].icon}.png`
        })
        .catch(error => console.error(error))
    },
    error => {
      console.error(error)
      alert('Impossível obter localização.')
    }
  )
}

getLocationWeather()

