const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

// Verifica se as informações de localização estão no localStorage.
const storedLocation = JSON.parse(localStorage.getItem('location'))
if (storedLocation) {
  const { latitude, longitude } = storedLocation
  const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { name, sys, main, weather } = data
      document.getElementById('city').textContent = name
      document.getElementById('country').textContent = sys.country
      document.getElementById('temp').textContent = `${Math.round(main.temp)}°C`
      document.getElementById('desc').textContent = weather[0].description
      document.getElementById(
        'icon'
      ).src = `https://openweathermap.org/img/w/${weather[0].icon}.png`
    })
    .catch(error => console.error(error))
} else {
  // Solicita perm de localização.
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        localStorage.setItem(
          'location',
          JSON.stringify({ latitude, longitude })
        )
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
  } else {
    console.log('Geolocalização não está disponível.')
  }
}

