const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = 'SUA_CHAVE_AQUI' // Lembre-se de definir sua API key

// Verifica se as informações de localização estão no localStorage.
const storedLocation = JSON.parse(localStorage.getItem('location'))

function fetchWeather(latitude, longitude) {
  const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { name, sys, main, weather } = data
      document.getElementById('city').textContent = name
      document.getElementById('country').textContent = sys.country
      document.getElementById('temp').textContent = `${Math.round(main.temp)}°C`
      document.getElementById('desc').textContent = weather[0].description
      document.getElementById('icon').src = `https://openweathermap.org/img/w/${weather[0].icon}.png`
    })
    .catch(error => console.error('Erro ao obter os dados climáticos:', error))
}

function getLocationWeather() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        localStorage.setItem('location', JSON.stringify({ latitude, longitude }))
        fetchWeather(latitude, longitude)
      },
      error => {
        console.error('Erro ao obter localização:', error)
        alert('Impossível obter localização.')
      }
    )
  } else {
    console.log('Geolocalização não está disponível.')
  }
}

// Se já houver localização salva, usa ela. Senão, pede permissão.
if (storedLocation) {
  fetchWeather(storedLocation.latitude, storedLocation.longitude)
} else {
  getLocationWeather()
}
